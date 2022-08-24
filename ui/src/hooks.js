import { getUserData } from '$lib/account';
import { parse } from 'cookie';

export async function getSession(event) {
    return {
        user: event.locals.user
    };
}

export async function handle({ event, resolve }) {
    const cookies = parse(event.request.headers.get('cookie') ?? '');
    if (cookies.authKey) {
        const user = await getUserData(cookies.authKey);
        event.locals.user = user;
    }
    return resolve(event);
}
