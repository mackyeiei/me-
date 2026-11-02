import { pinsAll, pinsReplace, type Pin } from './db';
import { isPlan, loadPlan, savePlan, type Plan } from './plan';

export interface Backup {
  app: 'offline-survival';
  version: 1;
  exportedAt: string;
  plan: Plan;
  pins: Pin[];
}

export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export async function exportBackup(): Promise<void> {
  const data: Backup = {
    app: 'offline-survival',
    version: 1,
    exportedAt: new Date().toISOString(),
    plan: await loadPlan(),
    pins: await pinsAll()
  };
  const json = JSON.stringify(data, null, 2);
  const name = `survival-backup-${data.exportedAt.slice(0, 10)}.json`;

  // iOS home-screen apps handle downloads poorly; the share sheet has "Save to Files".
  if (isIOS() && 'share' in navigator) {
    const file = new File([json], name, { type: 'application/json' });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: name });
        return;
      } catch (e) {
        if ((e as DOMException).name === 'AbortError') return;
      }
    }
  }
  const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function parseBackup(text: string): Backup | null {
  try {
    const d = JSON.parse(text) as Backup;
    if (d?.app !== 'offline-survival' || !isPlan(d.plan)) return null;
    const pins = Array.isArray(d.pins) ? d.pins : [];
    const okPins = pins.every(
      (p) => p && typeof p.id === 'string' && typeof p.lat === 'number' && typeof p.lon === 'number'
    );
    return okPins ? { ...d, pins } : null;
  } catch {
    return null;
  }
}

export async function restoreBackup(b: Backup) {
  await savePlan(b.plan);
  await pinsReplace(b.pins);
}
