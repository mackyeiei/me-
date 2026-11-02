import { useEffect, useState } from 'preact/hooks';
import { registerSW } from 'virtual:pwa-register';
import { t } from '../i18n';

let update: ((reload?: boolean) => Promise<void>) | null = null;

/**
 * Registers the service worker. The browser itself checks for a new sw.js on
 * each app launch while online — we never poll.
 */
export function UpdateBanner() {
  const [state, setState] = useState<'none' | 'ready' | 'refresh'>('none');
  useEffect(() => {
    if (update || !('serviceWorker' in navigator)) return;
    update = registerSW({
      onNeedRefresh: () => setState('refresh'),
      onOfflineReady: () => setState('ready')
    });
  }, []);

  if (state === 'none') return null;
  return (
    <div class="banner" role="status">
      <span>{state === 'ready' ? t('sw.offlineReady') : t('sw.needRefresh')}</span>
      {state === 'refresh' ? (
        <button class="primary" onClick={() => update?.(true)}>{t('common.reload')}</button>
      ) : (
        <button onClick={() => setState('none')}>{t('common.dismiss')}</button>
      )}
    </div>
  );
}
