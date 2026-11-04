import { t, type StringKey } from '../i18n';
import type { GuidePage } from '../lib/guide-types';
import pages from 'virtual:guide/en';
import { Icon } from '../components/icons';
import { GearArt } from '../gear/art';
import { GEAR } from '../gear/data';

// When Thai lands, pick the page set by locale here.
const all: GuidePage[] = pages;

/** Section order + colour. */
export const SECTIONS: [string, string][] = [
  ['priorities', '#ff5a4e'],
  ['hacks', '#ffd60a'],
  ['water', '#64d2ff'],
  ['food', '#ffb020'],
  ['fire', '#ff9f0a'],
  ['shelter', '#ff6b3d'],
  ['firstaid', '#ff6482'],
  ['navigation', '#32d74b'],
  ['signaling', '#ffd60a'],
  ['urban', '#bf5af2'],
  ['repairs', '#c8a27a'],
  ['hygiene', '#40c8e0'],
  ['bugout', '#32d74b']
];
const colorOf = (s: string) => SECTIONS.find(([id]) => id === s)?.[1] ?? '#a3a3a0';
const sectionName = (s: string) => t(`section.${s}` as StringKey);

export default function GuideTab({ sub }: { sub: string }) {
  if (sub === 'gear') return <GearPage />;
  const page = sub ? all.find((p) => p.id === sub) : undefined;
  if (page) return <Page page={page} />;

  const hacks = all.filter((p) => p.section === 'hacks');
  const sections = SECTIONS.filter(([s]) => s !== 'hacks' && all.some((p) => p.section === s));
  return (
    <div class="guide-index">
      <div class="feature-grid">
        <a class="feature" href="#/guide/gear" style="--c:#ff9f0a">
          <span class="art"><GearArt name="bag" color="#ff9f0a" /></span>
          <div>
            <strong>{t('guide.gearTitle')}</strong>
            <br />
            <span>{t('guide.gearSub')}</span>
          </div>
        </a>
        {hacks[0] && (
          <a class="feature" href={`#/guide/${hacks[0].id}`} style="--c:#ffd60a">
            <span class="art"><Icon name="hacks" size={48} /></span>
            <div>
              <strong>{t('guide.hacksTitle')}</strong>
              <br />
              <span>{t('guide.pages', { n: hacks.length })}</span>
            </div>
          </a>
        )}
      </div>

      {hacks.length > 0 && <Section id="hacks" list={hacks} />}
      {sections.map(([s]) => (
        <Section id={s} key={s} list={all.filter((p) => p.section === s)} />
      ))}
      <p class="disclaimer">{t('guide.disclaimer')}</p>
    </div>
  );
}

function Section({ id, list }: { id: string; list: GuidePage[] }) {
  const c = colorOf(id);
  return (
    <section style={`--c:${c}`}>
      <div class="sec-head">
        <span class="badge"><Icon name={id} /></span>
        <h2>{sectionName(id)}</h2>
      </div>
      <ul class="links">
        {list.map((p) => (
          <li key={p.id}>
            <a href={`#/guide/${p.id}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Page({ page }: { page: GuidePage }) {
  const c = colorOf(page.section);
  const siblings = all.filter((p) => p.section === page.section);
  const idx = siblings.findIndex((p) => p.id === page.id);
  const next = siblings[idx + 1];
  return (
    <article class="guide-page" style={`--c:${c}`}>
      <a class="btn back" href="#/guide">‹ {t('common.back')}</a>
      <div class="page-hero">
        <span class="badge"><Icon name={page.section} size={30} /></span>
        <div>
          <p class="eyebrow">{sectionName(page.section)}</p>
          <h2 class="page-title">{page.title}</h2>
        </div>
      </div>
      {/* Trusted: compiled from our own Markdown at build time. */}
      <div class="md" dangerouslySetInnerHTML={{ __html: page.html }} />
      {next && (
        <a class="links-next btn" href={`#/guide/${next.id}`}>
          {t('guide.next')}: {next.title} ›
        </a>
      )}
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

function GearPage() {
  return (
    <article class="guide-page" style="--c:#ff9f0a">
      <a class="btn back" href="#/guide">‹ {t('common.back')}</a>
      <div class="page-hero">
        <span class="badge"><GearArt name="bag" color="#ff9f0a" /></span>
        <div>
          <p class="eyebrow">{t('section.bugout')}</p>
          <h2 class="page-title">{t('guide.gearTitle')}</h2>
        </div>
      </div>
      <p class="lead">{t('guide.gearLead')}</p>
      {GEAR.map((tier) => (
        <section key={tier.title} style={`--c:${tier.color}`}>
          <div class="gear-tier">
            <span class="chip">{tier.items.length}</span>
            <h2>{tier.title}</h2>
          </div>
          <p class="muted">{tier.hint}</p>
          <ul class="gear-grid">
            {tier.items.map((g) => (
              <li class="gear-card" key={g.name}>
                <span class="art"><GearArt name={g.art} color={g.color} /></span>
                <div>
                  <h3>{g.name}</h3>
                  <p class="why">{g.why}</p>
                  <p class="buy">{g.buy}</p>
                  <span class="price">≈ {g.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <a class="btn primary wide-link" href="#/plan">{t('guide.gearToPlan')}</a>
      <footer>
        <h3>{t('guide.sources')}</h3>
        <ul class="sources">
          <li>FEMA / Ready.gov, "Build a Kit" (public domain)</li>
          <li>American Red Cross, "Survival Kit Supplies"</li>
          <li>Prices: approximate Bangkok retail, 2026. Check before you buy.</li>
        </ul>
      </footer>
    </article>
  );
}
