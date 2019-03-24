import Dexie from 'dexie';

const db = new Dexie('APKStore');
db.version(1).stores({
    APKStore: `APAddress,KStore`
});

export default db;