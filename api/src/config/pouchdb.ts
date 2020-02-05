import PouchDB from 'pouchdb';
import memory from 'pouchdb-adapter-memory';
PouchDB.plugin(memory);

class PouchdbConfig {
  public db: PouchDB.Database;

  public init() {
    this.db = new PouchDB('dbname', { adapter: 'memory' });
  }
}

export default new PouchdbConfig();
