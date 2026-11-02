import { t, type StringKey } from '../i18n';
import type { GuidePage } from '../lib/guide-types';
import pages from 'virtual:guide/en';

// When Thai lands, pick the page set by locale here.
const all: GuidePage[] = pages;

const SECTION_ORDER = [
  'priorities', 'water', 'food', 'fire', 'shelter', 'firstaid',
  'navigation', 'signaling', 'urban', 'repairs', 'hygiene', 'bugout'
];

function sectionName(s: string) {
  return t(`section.${s}` as StringKey);
}

export default function GuideTab({ sub }: { sub: string }) {
  const page = sub ? all.find((p) => p.id === sub) : undefined;
  if (page) return <Page page={page} />;

  const sections = SECTION_ORDER.filter((s) => all.some((p) => p.section === s));
  return (
    <div class="guide-index">
      {sections.map((s) => (
        <section key={s}>
          <h2>{sectionName(s)}</h2>
          <ul class="links">
            {all
              .filter((p) => p.section === s)
              .map((p) => (
                <li key={p.id}>
                  <a href={`#/guide/${p.id}`}>{p.title}</a>
                </li>
              ))}
          </ul>
        </section>
      ))}
      <p class="disclaimer">{t('guide.disclaimer')}</p>
    </div>
  );
}

function Page({ page }: { page: GuidePage }) {
  return (
    <article class="guide-page">
      <a class="btn back" href="#/guide">‹ {t('common.back')}</a>
      <p class="eyebrow">{sectionName(page.section)}</p>
      <h2 class="page-title">{page.title}</h2>
      {/* Trusted: compiled from our own Markdown at build time. */}
      <div class="md" dangerouslySetInnerHTML={{ __html: page.html }} />
      <footer>
        <h3>{t('guide.sources')}</h3>
        <ul class="sources">
          {page.sources.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <p class="disclaimer">{t('guide.disclaimer')}</p>
      </footer>
    </article>
  );
}
