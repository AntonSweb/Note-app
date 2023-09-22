export default function(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    function createObjectStore(
      db: IDBDatabase,
      storeName: string,
      options: IDBObjectStoreParameters
    ): IDBObjectStore {
      if (DBOpenRequest.transaction == null) {
        throw new Error(
          "Error opening database. Open request transaction is null.",
        );
      }
      if (db.objectStoreNames.contains(storeName)) {
        return DBOpenRequest.transaction.objectStore(storeName);
      } else {
        return db.createObjectStore(storeName, options);
      }
    }
    function createIndex(
      store: IDBObjectStore,
      indexName: string,
      keyPath: ReadonlyArray<string>,
      options: IDBIndexParameters,
    ): void {
      if (store.indexNames.contains(indexName)) {
        return;
      } else {
        store.createIndex(indexName, keyPath, options);
      }
    }
    function removeUnusedIndexes(
      store: IDBObjectStore,
      indexNames: ReadonlyArray<string>,
    ): void {
      for (const indexName of Array.from(store.indexNames)) {
        if (indexNames.includes(indexName) === false) {
          store.deleteIndex(indexName);
        }
      }
    }

    const DBOpenRequest: IDBOpenDBRequest = indexedDB.open("NotesDB", 1);
    DBOpenRequest.onerror = () => {
      reject(new Error("Error opening database: NotesDB"));
    };
    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      resolve(db);
    };
    DBOpenRequest.onupgradeneeded = () => {
      const db = DBOpenRequest.result;
      const store = createObjectStore(db, "Notes", {
        keyPath: "id",
        autoIncrement: true
      });
      removeUnusedIndexes(store, ["id", "title"]);
      createIndex(store, "title", ["title"], { unique: false });
    };
  });
};
