/** Ask the browser not to evict our data (IndexedDB, caches, map files). */
export async function requestPersist(): Promise<boolean | undefined> {
  if (!navigator.storage?.persist) return undefined;
  try {
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return undefined;
  }
}

export const isStandalone = () =>
  matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;
