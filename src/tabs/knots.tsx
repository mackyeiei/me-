import '../knots/knots.css';
import { useEffect, useState } from 'preact/hooks';
import { t } from '../i18n';
import { CAT_LABEL, KNOTS } from '../knots/data';
import { KnotSVG } from '../knots/render';
import type { Knot } from '../knots/types';
import { Icon } from '../components/icons';

const lastFrame = (k: Knot) => k.frames[k.frames.length - 1];

function Level({ n }: { n: number }) {
  return (
    <span class="level" aria-label={`Difficulty ${n} of 3`}>
      {[1, 2, 3].map((i) => <i key={i} class={i <= n ? 'on' : ''} />)}
    </span>
  );
}

export default function KnotsTab({ sub }: { sub: string }) {
  if (sub === '_sheet') return <Sheet />;
  const knot = KNOTS.find((k) => k.id === sub);
  if (knot) return <KnotPage knot={knot} />;

  return (
    <div>
      <p class="lead">{t('knots.lead')}</p>
      <ul class="knot-grid">
        {KNOTS.map((k) => (
          <li key={k.id}>
            <a href={`#/knots/${k.id}`} class="knot-card">
              <div class="knot-thumb">
                <KnotSVG knot={k} frame={lastFrame(k)} label={k.name} />
              </div>
              <div class="knot-meta">
                <span class={`chip cat-${k.cat}`}>{CAT_LABEL[k.cat]}</span>
                <strong>{k.name}</strong>
                <Level n={k.level} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function KnotPage({ knot }: { knot: Knot }) {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [knot.id]);
  const total = knot.frames.length;
  const frame = knot.frames[i];

  return (
    <article class="knot-page">
      <div class="knot-top">
        <a class="btn back icon-back" href="#/knots" aria-label={t('common.back')}>‹</a>
        <h2 class="knot-title">{knot.name}</h2>
        <Level n={knot.level} />
      </div>

      <div class="knot-stage">
        <KnotSVG knot={knot} frame={frame} next={knot.frames[i + 1]} label={`${knot.name}, step ${i + 1}`} />
        <div class="step-dots" aria-hidden="true">
          {knot.frames.map((_, j) => <i key={j} class={j === i ? 'on' : j < i ? 'done' : ''} />)}
        </div>
      </div>

      <div class="step-box" aria-live="polite">
        <span class="step-num">{i + 1}<small>/{total}</small></span>
        <p>{frame.s}</p>
      </div>

      <div class="step-nav">
        <button disabled={i === 0} onClick={() => setI(i - 1)}>‹ {t('knots.prev')}</button>
        <button class="primary" disabled={i === total - 1} onClick={() => setI(i + 1)}>{t('knots.next')} ›</button>
      </div>

      <p class="knot-tag">
        <span class={`chip cat-${knot.cat}`}>{CAT_LABEL[knot.cat]}</span> {knot.tag}
      </p>
      <section class="info-card use">
        <h3><Icon name="target" /> {t('knots.use')}</h3>
        <ul>{knot.use.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>
      <section class="info-card check">
        <h3><Icon name="check" /> {t('knots.check')}</h3>
        <ul>{knot.check.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>
      <section class="info-card mistakes">
        <h3><Icon name="alert" /> {t('knots.mistakes')}</h3>
        <ul>{knot.mistakes.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>
      <p class="disclaimer">{t('knots.disclaimer')}</p>
    </article>
  );
}

/** Dev helper: every frame of every knot on one page (#/knots/_sheet). */
function Sheet() {
  return (
    <div class="sheet">
      {KNOTS.map((k) => (
        <section key={k.id}>
          <h3>{k.name}</h3>
          <div class="sheet-row">
            {k.frames.map((f, i) => (
              <div class="sheet-cell" key={i}>
                <KnotSVG knot={k} frame={f} next={k.frames[i + 1]} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
