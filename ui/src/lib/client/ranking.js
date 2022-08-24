
export class Ranking {
    constructor() {
    }

    static default() {
        if (!this._default) this._default = new Ranking();
        return this._default;    
    }

    async get(fetch=fetch) {
        const res = await fetch('/ranking', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) return await res.json();
        else throw Error('The server did not response to the request. This is likely an internal error. Please, try again later.');
    }

    async update(id, newIdx, fetch=fetch) {
        const params = { id, newIdx };
        const res = await fetch('/ranking', {
            method: 'PATCH',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) throw Error('The requested update to ranking has failed. This is likely an internal error. Please, try again later.');
        return await res.json();
    }
}
