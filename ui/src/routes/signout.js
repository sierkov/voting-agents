import * as cookies from 'cookie';

export async function post() {
    return {
        headers: {
            'Set-Cookie': cookies.serialize('authKey', '', {
                path: '/',
                sameSite: true,
                secure: true,
                expires: new Date(0)
            })
        },
        body: 'OK',
        status: 200
    };
}
