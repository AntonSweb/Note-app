import init from "./idb";

export type TNote = {
  id: number;
  title: string;
  text: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
};

export type TNoteArgs = {
  title: string;
  text: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
};

export function getAll(): Promise<Array<TNote>> {
  return new Promise(async (resolve, reject) => {
    const db = await init();
    const tx = db.transaction("Notes", "readwrite");
    const store = tx.objectStore("Notes");
    const DBGetAllRequest = store.getAll();
    DBGetAllRequest.onerror = () => {
      if (DBGetAllRequest != null) {
        reject(DBGetAllRequest.error);
      } else {
        reject(error);
      }
    };
    DBGetAllRequest.onsuccess = () => {
      if (DBGetAllRequest != null) {
        const result: Array<TNote> = DBGetAllRequest.result;
        resolve(sort(result));
      } else {
        reject(successError);
      }
    };
  });
}

export function add(
  arg: TNoteArgs
): Promise<TNote> {
  return new Promise(async (resolve, reject) => {
    const db = await init();
    const tx = db.transaction("Notes", "readwrite");
    const store = tx.objectStore('Notes');
    const DBAddRequest: IDBRequest = store.add({ ...arg });
    DBAddRequest.onerror = () => {
      if (DBAddRequest != null) {
        reject(DBAddRequest.error);
      } else {
        reject(error);
      }
    };
    DBAddRequest.onsuccess = () => {
      if (DBAddRequest != null) {
        const result: TNote = {
          id: DBAddRequest.result,
          ...arg,
        };
        resolve(result);
      } else {
        reject(successError);
      }
    };
  });
}

export function remove(
  id: number
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const db = await init();
    const tx = db.transaction("Notes", "readwrite");
    const store = tx.objectStore('Notes');
    const DBDeleteRequest: IDBRequest = store.delete(id);
    DBDeleteRequest.onerror = () => {
      if (DBDeleteRequest != null) {
        reject(DBDeleteRequest.error);
      } else {
        reject(error);
      }
    };
    DBDeleteRequest.onsuccess = () => {
      if (DBDeleteRequest != null) {
        resolve();
      } else {
        reject(successError);
      }
    };
  });
};

function sort(data: Array<TNote>): Array<TNote> {
  return data.sort((a: TNote, b: TNote) => {
    return (a.createdAt < b.createdAt)
      ? 1
      : ((a.createdAt > b.createdAt)
        ? -1
        : 0);
  });
}

const error: Error = new Error("Unknown error occurred trying to perform operation");
const successError: Error = new Error("Operation produced a null result");