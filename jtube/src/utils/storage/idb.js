import { openDB } from "idb";

const idbName = "app";
const VERSION = 2;

export async function idbGet(store, key) {
  const dbPromise = openDB(idbName, VERSION, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      if (!db.objectStoreNames.contains("expiry")) {
        db.createObjectStore("expiry");
      }
      if (!db.objectStoreNames.contains("ft-meta")) {
        db.createObjectStore("ft-meta");
      }
      if (!db.objectStoreNames.contains("ft-action")) {
        db.createObjectStore("ft-action");
      }
    },
  });
  const dbPromiseObj = await dbPromise;
  if (dbPromiseObj.objectStoreNames.contains(store)) {
    return (await dbPromise).get(store, key);
  }
}

export async function idbSet(store, key, val) {
  const dbPromise = openDB(idbName, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("expiry")) {
        db.createObjectStore("expiry");
      }
      if (!db.objectStoreNames.contains("ft-meta")) {
        db.createObjectStore("ft-meta");
      }
      if (!db.objectStoreNames.contains("ft-action")) {
        db.createObjectStore("ft-action");
      }
    },
  });
  const dbPromiseObj = await dbPromise;
  if (dbPromiseObj.objectStoreNames.contains(store)) {
    return (await dbPromise).put(store, val, key);
  }
}

export async function idbKeys(store) {
  const dbPromise = openDB(idbName, VERSION, {
    upgrade(db) {
      db.createObjectStore(store);
    },
  });
  return (await dbPromise).getAllKeys(store);
}

export async function idbDelete(store, key) {
  const dbPromise = openDB(idbName, VERSION, {
    upgrade(db) {
      db.createObjectStore(store);
    },
  });
  return (await dbPromise).delete(store, key);
}

export async function idbClear(store) {
  const dbPromise = openDB(idbName, VERSION, {
    upgrade(db) {
      db.createObjectStore(store);
    },
  });
  return (await dbPromise).clear(store);
}
