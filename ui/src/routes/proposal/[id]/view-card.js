import sql from '/workspace/lib/js/db';

export async function post({ params, locals }) {
    try {
        if (params.id === undefined) throw Error(`Missing required URL parameters: ${JSON.stringify(params)}`);
    } catch (err) {
        console.error(err);
        return {
            body: 'Invalid request',
            status: 400
        }
    }
    try {
        await sql`
            WITH myuser AS (SELECT id, 'ABC' AS join_key from USERS where email=${locals.user?.email}),
                myproposal AS (SELECT id, 'ABC' AS join_key FROM proposals WHERE public_id=${params.id})
            INSERT INTO user_proposal_card_views (user_id, proposal_id, viewed_at)
                SELECT u.id, p.id, CURRENT_TIMESTAMP FROM myuser u FULL OUTER JOIN myproposal p USING (join_key)
        `;
        return {
            body: 'OK',
            status: 201
        }
    } catch (err) {
        console.error(err);
        return {
            body: 'Internal server error',
            status: 500
        }
    }
}
