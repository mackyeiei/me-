/** Tiny IndexedDB wrapper. One DB, two stores: kv (misc) and pins. */

export interface Pin {
  id: string;
  name: string;
  kind: string;
  lat: number;
  lon: number;
  note?: string;
  created: number;
}

const DB_NAME = 'survival';
const DB_VERSION = 1;
let dbp: Promise<IDBDatabase> | null = null;

function open(): Promise<IDBDatabase> {
  return (dbp ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
      if (!db.objectStoreNames.contains('pins')) db.createObjectStore('pins', { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}

async function run<T>(
  store: 'kv' | 'pins',
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T> | void
): Promise<T> {
  const db = await open();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const req = fn(tx.objectStore(store));
    tx.oncomplete = () => resolve(req ? req.result : (undefined as T));
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export const kvGet = <T>(key: string) => run<T | undefined>('kv', 'readonly', (s) => s.get(key));
export const kvSet = (key: string, value: unknown) => run('kv', 'readwrite', (s) => s.put(value, key));

export const pinsAll = () => run<Pin[]>('pins', 'readonly', (s) => s.getAll());
export const pinPut = (p: Pin) => run('pins', 'readwrite', (s) => s.put(p));
export const pinDelete = (id: string) => run('pins', 'readwrite', (s) => s.delete(id));

export async function pinsReplace(pins: Pin[]) {
  const db = await open();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction('pins', 'readwrite');
    const s = tx.objectStore('pins');
    s.clear();
    for (const p of pins) s.put(p);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
