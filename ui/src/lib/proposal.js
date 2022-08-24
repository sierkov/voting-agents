import * as fs from 'fs';
import sql from '/workspace/lib/js/db';

const loadStart = Date.now();

const categoriesExt = JSON.parse(fs.readFileSync('/workspace/data/categories/_list_ext.json', { encoding: 'utf8' }));
for (const [id, meta] of Object.entries(categoriesExt)) {
    Object.defineProperty(categoriesExt, id, {
        value: meta,
        writable: false,
        configurable: false,
        enumerable: true
    });
}
const categories = Object.fromEntries(Array.from(Object.entries(categoriesExt)).map(([catId, catInfo]) => [catId, catInfo.name]));
for (const [id, name] of Object.entries(categories)) {
    Object.defineProperty(categories, id, {
        value: name,
        writable: false,
        configurable: false,
        enumerable: true
    });
}

let categoryProposals;
let proposals = new Promise((resolve, reject) => {
    sql`SELECT public_id AS id, title, description, html, categories FROM proposals`
        .then((proposalList) => {
            const proposalMap = {};
            for (const p of proposalList) {
                p.categories = JSON.parse(p.categories);
                proposalMap[p.id] = p;
            }
            categoryProposals = Object.fromEntries(Array.from(Object.keys(categories)).map(catId => [catId, proposalList.filter(p => p.categories?.includes(catId) || (catId === '' && p.categories?.length === 0))]));
            resolve(proposalMap);
        })
        .catch((err) => reject(err));    
});

const cat2Color = Object.fromEntries(Array.from(Object.entries(categoriesExt)).map(([catId, catInfo]) => [catId, catInfo.color]));
const loadDuration = (Date.now() - loadStart) / 1000;
console.log('lib/proposals init', loadDuration, 'secs');

export async function proposalGet(id) {
    return (await proposals)[id];
}

export async function proposalGetMany(ids) {
    const props = await proposals;
    return ids.map(pid => props[pid]).filter(p => p);
}

export async function proposalGetAll() {
    return await proposals;
}

export async function proposalsGetRecommended(email, myRanking=undefined) {
    let suggestedIds;
    if (email) {
        const recs = await sql`
            SELECT ud.data_value AS data_value
                FROM users u
                LEFT JOIN user_data ud ON (u.id=ud.user_id AND ud.data_name=${'suggested-proposals'})
                WHERE u.email=${email} AND ud.data_value IS NOT NULL`;
        if (recs?.length === 1) {
            const prefix = 'catalyst_best:';
            suggestedIds = recs[0].data_value;
            suggestedIds = suggestedIds.map(pid => pid.startsWith(prefix) ? pid.slice(prefix.length) : pid);
        }
    }
    if (!suggestedIds) suggestedIds = [];
    if (myRanking) {
        const myRankingSet = new Set(myRanking);
        suggestedIds = suggestedIds.filter(pid => !myRankingSet.has(pid));
    }
    return (await proposalGetMany(suggestedIds));
}

export async function proposalsUpdatingRecommended(email) {
    let updating = false;
    if (email) {
        const recs = await sql`
            SELECT ud2.data_value IS NULL OR (ud1.data_value#>>'{}')::FLOAT8 > (ud2.data_value#>>'{}')::FLOAT8) updating
                FROM users u
                LEFT JOIN user_data ud1 ON (u.id=ud.user_id AND ud.data_name=${'suggested-proposals-new-data-at'})
                LEFT JOIN user_data ud2 ON (u.id=ud.user_id AND ud.data_name=${'suggested-proposals-updated-at'})
                WHERE u.email=${email}`;
        if (recs?.length === 1 && recs[0].updating) updating = true;
    }
    return updating;
}

export async function proposalsForCategory(catId) {
    await proposals;
    return categoryProposals[catId];
}

export async function proposalsForAllCategories() {
    await proposals;
    return categoryProposals;
}

export function proposalCategories() {
    return categories;
}

export function proposalCategoriesExt() {
    return categoriesExt;
}

export function proposalCategoryColors() {
    return { ...cat2Color };
}
