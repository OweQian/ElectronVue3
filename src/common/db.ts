import knex, { Knex} from 'knex';
import fs from 'fs';
import path from 'path';

let dbInstance: Knex;

// @ts-ignore
if (!dbInstance) {
  let dbPath = process.env.APPDATA || `${process.env.HOME}${process.platform === 'darwin' ? '/Library/Preferences' : '/.local/share'}`;
  dbPath = path.join(dbPath, 'Electron');
  const dbIsExist = fs.existsSync(dbPath);
  if (!dbIsExist) {
    const resourceDbPath = path.join(process.execPath, '../resources/db.db');
    fs.copyFileSync(resourceDbPath, dbPath);
  }
  dbInstance = knex({
    client: 'better-sqlite3',
    connection: { filename: dbPath },
    useNullAsDefault: true,
  })
}

export let db = dbInstance;

