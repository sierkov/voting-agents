import * as cookies from 'cookie';
import { getAccountDataByEmail, setAccountData } from '$lib/account';

export async function post({ request }) {
    try {
        const params = await request.json();
        if (!params.email || !params.code) throw Error(`Missing required parameters: ${JSON.stringify(params)}`);
        const account = await getAccountDataByEmail(params.email);
        if (!account) throw Error(`No account data for ${params.email}`);
        if (!account.authKey) throw Error(`No authKey for ${params.email}`);
        if (!account.secretMaxTime || account.secretMaxTime < Date.now() / 1000) throw Error(`Missing account metadata: ${JSON.stringify(account)}`);
        if (account.secretAttempts === undefined || account.secretAttempts >= 3) throw Error(`Too many attempts: ${JSON.stringify(account)}`);
        account.secretAttempts++;
        await setAccountData(params.email, account.authKey, account);
        if (account.secret !== params.code) throw Error(`Incorrect code: ${JSON.stringify(account)}`);;
        account.lastSignInTime = new Date().toISOString();
        account.secret = undefined;
        account.secretAttempts = undefined;
        account.secretMaxTime = undefined;
        await setAccountData(params.email, account.authKey, account);
        return {
            headers: {
                'Set-Cookie': cookies.serialize('authKey', account.authKey, {
                    path: '/',
                    sameSite: 'lax',
                    secure: true,
                    maxAge: 7 * 24 * 3600,
                })
            },
            body: 'OK',
            status: 201
        }
    } catch (err) {
        console.error(err);
        return {
            body: 'Invalid request',
            status: 400
        }
    }
}
