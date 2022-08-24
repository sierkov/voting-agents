import { stringify } from 'safe-stable-stringify';
import sql from '/workspace/lib/js/db';

export async function getAccountDataByKey(key) {
    const res = await sql`
        SELECT email, other_data
            FROM users
            WHERE auth_key=${key}
    `;
    if (res.length !== 1) return undefined;
    return { ...JSON.parse(res[0].other_data), email: res[0].email };
}

export async function getAccountDataByEmail(email) {
    const res = await sql`
        SELECT auth_key, other_data
            FROM users
            WHERE email=${email}
    `;
    if (res.length !== 1) return undefined;
    return { ...JSON.parse(res[0].other_data), authKey: res[0].auth_key };
}

export async function setAccountData(email, authKey, otherData) {
    const saveData = { ...otherData, email: undefined, authKey: undefined };
    await sql`
        WITH v(email, auth_key, other_data) AS (
            VALUES(${email}, ${authKey}, ${stringify(saveData)}::JSON)
        )
        INSERT INTO users (email, auth_key, other_data)
            SELECT email, auth_key, other_data FROM v
            ON CONFLICT (email) DO UPDATE SET auth_key=EXCLUDED.auth_key, other_data=EXCLUDED.other_data
    `;
}

export async function getUserData(authKey) {
    const account = await getAccountDataByKey(authKey);
    if (account) {
        return {
            authenticated: true,
            email: account.email
        };
    }
    return undefined;
}

export async function getData(email, name) {
    if (email === undefined || name === undefined) return undefined;
    const res = await sql`
        SELECT u.id, ud.data_value
            FROM users u
                LEFT JOIN user_data ud ON (u.id=ud.user_id AND ud.data_name=${name})
            WHERE
                u.email=${email}
    `;
    if (res.length !== 1) return undefined;
    return JSON.parse(res[0].data_value);
}

export async function setData(email, name, data) {
    if (email === undefined || name === undefined) return undefined;
    await sql`
        WITH v AS (
            SELECT id, ${name} AS data_name, ${JSON.stringify(data)}::JSON AS data_value
                FROM users
                WHERE email=${email}
        )
        INSERT INTO user_data (user_id, data_name, data_value)
            SELECT * FROM v
            ON CONFLICT (user_id, data_name) DO UPDATE SET data_value=EXCLUDED.data_value
    `;
}
