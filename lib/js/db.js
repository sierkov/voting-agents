import fs from 'fs';
import postgres from 'postgres';
const dbConf = JSON.parse(fs.readFileSync('/workspace/etc/secret-db.json'));
const sql = postgres(dbConf);
export default sql;
