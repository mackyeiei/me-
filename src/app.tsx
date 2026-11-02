import { useEffect, useState } from 'preact/hooks';
import { t, type StringKey } from './i18n';
import { lazy } from './lib/lazy';
import { TabIcon } from './components/icons';
import { UpdateBanner } from './components/update-banner';
import PlanTab from './tabs/plan';
import Soon from './tabs/soon';

export const TABS = ['map', 'compass', 'guide', 'knots', 'plan', 'tools'] as const;
export type Tab = (typeof TABS)[number];

const GuideTab = lazy(() => import('./tabs/guide'));
const ToolsTab = lazy(() => import('./tabs/tools'));

function parseHash(): { tab: Tab; sub: string } {
  const [, tab, ...rest] = location.hash.replace(/^#/, '').split('/');
  if ((TABS as readonly string[]).includes(tab)) return { tab: tab as Tab, sub: rest.join('/') };
  let last: string | null = null;
  try {
    last = localStorage.getItem('lastTab');
  } catch {}
  return { tab: (TABS as readonly string[]).includes(last ?? '') ? (last as Tab) : 'plan', sub: '' };
}

function useTheme() {
  const [red, setRed] = useState(document.documentElement.dataset.theme === 'red');
  useEffect(() => {
    if (red) document.documentElement.dataset.theme = 'red';
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem('theme', red ? 'red' : 'black');
    } catch {}
  }, [red]);
  return [red, setRed] as const;
}

export function App() {
  const [route, setRoute] = useState(parseHash);
  const [red, setRed] = useTheme();

  useEffect(() => {
    const on = () => setRoute(parseHash());
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('lastTab', route.tab);
    } catch {}
    window.scrollTo(0, 0);
  }, [route.tab, route.sub]);

  const { tab, sub } = route;

  return (
    <>
      <header class="top">
        <h1>{t(`tab.${tab}` as StringKey)}</h1>
        <button
          class={red ? 'theme on' : 'theme'}
          aria-pressed={red}
          aria-label={t('theme.toggle')}
          onClick={() => setRed(!red)}
        >
          {red ? t('theme.day') : t('theme.night')}
        </button>
      </header>
      <UpdateBanner />
      <main>
        {tab === 'map' && <Soon phase={3} text={t('soon.map')} />}
        {tab === 'compass' && <Soon phase={2} text={t('soon.compass')} />}
        {tab === 'guide' && <GuideTab sub={sub} />}
        {tab === 'knots' && <Soon phase={5} text={t('soon.knots')} />}
        {tab === 'plan' && <PlanTab />}
        {tab === 'tools' && <ToolsTab />}
      </main>
      <nav class="tabs" aria-label="Main">
        {TABS.map((id) => (
          <a href={`#/${id}`} aria-current={id === tab ? 'page' : undefined} key={id}>
            <TabIcon tab={id} />
            <span>{t(`tab.${id}` as StringKey)}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
