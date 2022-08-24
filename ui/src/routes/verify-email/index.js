import { setAccountData } from '$lib/account';

function makeRandomId(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    while (result.length < length) {
      result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return result;
}

export async function post({ request }) {
    const params = await request.json();
    const authKey = makeRandomId(32);
    const secret = makeRandomId(10);
    const other = {
        secret,
        secretAttempts: 0,
        secretMaxTime: Date.now() / 1000 + 86400
    };
    await setAccountData(params.email, authKey, other);
    const payload = { email: params.email, secret };
    const res = await fetch('http://api:5000/verify-email', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }});
    if (res.status !== 200) {
        console.error(await res.text());
        return {
            status: 500,
            body: 'Internal API has failed to respond'
        }
    }
    return {
        status: 200,
        body: await res.text()
    };
}
