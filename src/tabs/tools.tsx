import { useEffect, useState } from 'preact/hooks';
import { t } from '../i18n';
import { isStandalone, requestPersist } from '../lib/persist';

interface Status {
  sw: boolean;
  files: number;
  usage?: number;
  quota?: number;
  persisted?: boolean;
}

const mb = (n?: number) => (n == null ? t('tools.unknown') : `${(n / 1048576).toFixed(1)} MB`);
const yn = (b?: boolean) => (b == null ? t('tools.unknown') : b ? t('tools.yes') : t('tools.no'));

async function readStatus(): Promise<Status> {
  const s: Status = { sw: !!navigator.serviceWorker?.controller, files: 0 };
  try {
    const est = await navigator.storage?.estimate?.();
    s.usage = est?.usage;
    s.quota = est?.quota;
    s.persisted = await navigator.storage?.persisted?.();
  } catch {}
  if ('caches' in self) {
    for (const k of await caches.keys()) {
      s.files += (await (await caches.open(k)).keys()).length;
    }
  }
  return s;
}

export default function ToolsTab() {
  const [st, setSt] = useState<Status | null>(null);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    readStatus().then(setSt);
    // Event-driven, no polling.
    const on = () => setOnline(navigator.onLine);
    addEventListener('online', on);
    addEventListener('offline', on);
    return () => {
      removeEventListener('online', on);
      removeEventListener('offline', on);
    };
  }, []);

  return (
    <div>
      <section class="card">
        <h2>{t('tools.status')}</h2>
        <dl class="kv">
          <dt>{t('tools.sw')}</dt>
          <dd class={st ? (st.sw ? 'ok' : 'bad') : ''}>{st ? yn(st.sw) : '…'}</dd>
          <dt>{t('tools.files')}</dt>
          <dd>{st ? st.files : '…'}</dd>
          <dt>{t('tools.storage')}</dt>
          <dd>{st ? `${mb(st.usage)}${st.quota ? ` / ${mb(st.quota)}` : ''}` : '…'}</dd>
          <dt>{t('tools.persisted')}</dt>
          <dd class={st?.persisted ? 'ok' : 'bad'}>{st ? yn(st.persisted) : '…'}</dd>
          <dt>{t('tools.installed')}</dt>
          <dd class={isStandalone() ? 'ok' : 'bad'}>{yn(isStandalone())}</dd>
          <dt>{t('tools.online')}</dt>
          <dd>{online ? t('tools.onlineYes') : t('tools.onlineNo')}</dd>
        </dl>
        {st && !st.persisted && (
          <button class="primary wide" onClick={async () => { await requestPersist(); setSt(await readStatus()); }}>
            {t('tools.persistBtn')}
          </button>
        )}
      </section>
      <p class="muted">{t('tools.more')}</p>
    </div>
  );
}
