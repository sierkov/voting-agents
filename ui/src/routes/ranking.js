import { getData, setData } from "$lib/account";
import sql from '/workspace/lib/js/db';

export async function get({ locals }) {
    const ranking = await getData(locals.user?.email, 'ranking') ?? [];
    return {
        status: 200,
        body: ranking
    }
}

export async function patch({ request, locals }) {
    const email = locals.user?.email;
    const json = await request.json();
    if (json.id === undefined || json.newIdx === undefined) {
        return {
            status: 400,
            body: {
                error: 'Required parameters are missing'
            }
        };
    }
    const ranking = await getData(email, 'ranking') ?? [];
    const oldIdx = ranking.indexOf(json.id);
    if (oldIdx !== -1) ranking.splice(oldIdx, 1);
    if (json.newIdx >= 0) {
        if (json.newIdx >= ranking.length) ranking.push(json.id);
        else ranking.splice(json.newIdx, 0, json.id);
    }
    await setData(email, 'ranking', ranking);
    await sql`
        WITH myuser AS (SELECT id FROM users WHERE email=${locals.user?.email})
        INSERT INTO user_data (user_id, data_name, data_value)
            SELECT id, 'suggested-proposals-new-data-at', ${JSON.stringify(Date.now() / 1000)} FROM myuser
        ON CONFLICT (user_id, data_name) DO UPDATE SET data_value=EXCLUDED.data_value
    `;
    return {
        status: 200,
        body: ranking
    };
}
