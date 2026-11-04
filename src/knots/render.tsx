import type { Frame, Knot, Obj, Strand } from './types';

type V = { x: number; y: number };
interface Pt extends V { z: number }
interface Seg { a: V; c1: V; c2: V; b: V; z: number; work: boolean }

const parseCache = new Map<string, Pt[]>();
function parse(s: string): Pt[] {
  let r = parseCache.get(s);
  if (r) return r;
  let z = 2;
  r = s.trim().split(/\s+/).map((tok) => {
    const [x, y, zz] = tok.split(',').map(Number);
    if (zz !== undefined && !Number.isNaN(zz)) z = zz;
    return { x, y, z };
  });
  parseCache.set(s, r);
  return r;
}

/** Catmull-Rom -> cubic Bezier segments through all points. */
function segments(st: Strand): Seg[] {
  const P = parse(st.pts);
  const out: Seg[] = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] ?? P[i];
    const p1 = P[i];
    const p2 = P[i + 1];
    const p3 = P[i + 2] ?? P[i + 1];
    out.push({
      a: p1,
      c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      b: p2,
      z: p1.z,
      work: st.w !== undefined && i >= st.w
    });
  }
  return out;
}

const f = (n: number) => Math.round(n * 10) / 10;
const pathOf = (segs: Seg[]) =>
  `M${f(segs[0].a.x)} ${f(segs[0].a.y)}` +
  segs.map((s) => `C${f(s.c1.x)} ${f(s.c1.y)} ${f(s.c2.x)} ${f(s.c2.y)} ${f(s.b.x)} ${f(s.b.y)}`).join('');

interface Item { z: number; order: number; el: preact.JSX.Element }

function unit(v: V): V {
  const l = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / l, y: v.y / l };
}

function ropeItems(st: Strand, si: number, shown: number | null | undefined): Item[] {
  const all = segments(st);
  const count = shown == null ? all.length : Math.max(0, Math.min(all.length, shown - 1));
  const segs = all.slice(0, count);
  if (!segs.length) return [];
  const W = st.wd ?? 14;
  const dbl = !!st.dbl;
  const gap = 4;
  const body = dbl ? W * 2 + gap : W;
  const items: Item[] = [];
  // Group consecutive segments with the same layer + colour into one path.
  let start = 0;
  for (let i = 1; i <= segs.length; i++) {
    if (i === segs.length || segs[i].z !== segs[start].z || segs[i].work !== segs[start].work) {
      const run = segs.slice(start, i);
      const d = pathOf(run);
      const cls = run[0].work ? 'rope-w' : `rope-${st.c ?? 'a'}`;
      items.push({
        z: run[0].z,
        order: si * 1000 + start,
        el: (
          <g class={cls} key={`${si}-${start}`}>
            <path d={d} class="r-out" stroke-width={body + 10} />
            <path d={d} class="r-body" stroke-width={body} />
            <path d={d} class="r-lay" stroke-width={body - 3} />
            {dbl && <path d={d} class="r-out" stroke-width={gap} />}
          </g>
        )
      });
      start = i;
    }
  }
  // Bight loop at the tip of a doubled rope.
  if (dbl && st.loop) {
    const last = segs[segs.length - 1];
    const t = unit({ x: last.b.x - last.c2.x, y: last.b.y - last.c2.y });
    const n = { x: -t.y, y: t.x };
    const h = (W + gap) / 2;
    const R = st.loop;
    const e = last.b;
    const p1 = { x: e.x + n.x * h, y: e.y + n.y * h };
    const p2 = { x: e.x - n.x * h, y: e.y - n.y * h };
    const d =
      `M${f(p1.x)} ${f(p1.y)}C${f(p1.x + t.x * R * 1.4 + n.x * R * 0.7)} ${f(p1.y + t.y * R * 1.4 + n.y * R * 0.7)} ` +
      `${f(p2.x + t.x * R * 1.4 - n.x * R * 0.7)} ${f(p2.y + t.y * R * 1.4 - n.y * R * 0.7)} ${f(p2.x)} ${f(p2.y)}`;
    const cls = last.work ? 'rope-w' : `rope-${st.c ?? 'a'}`;
    items.push({
      z: last.z,
      order: si * 1000 + 999,
      el: (
        <g class={cls} key={`${si}-loop`}>
          <path d={d} class="r-out" stroke-width={W + 10} />
          <path d={d} class="r-body" stroke-width={W} />
          <path d={d} class="r-lay" stroke-width={W - 3} />
        </g>
      )
    });
  }
  return items;
}

function objItem(o: Obj, i: number): Item {
  return {
    z: o.z,
    order: -1000 + i,
    el: (
      <g class={`obj obj-${o.kind ?? 'wood'}`} key={`o${i}`}>
        <rect x={o.x - 4} y={o.y - 4} width={o.w + 8} height={o.h + 8} rx={10} class="o-out" />
        <rect x={o.x} y={o.y} width={o.w} height={o.h} rx={7} class="o-body" />
        <rect x={o.x + 6} y={o.y + 4} width={Math.max(4, Math.min(o.w, o.h) * 0.18)} height={o.h - 8} rx={3} class="o-shine" />
      </g>
    )
  };
}

/** Dashed "next move" arrow along the part of a strand revealed in the next frame. */
function nextArrow(st: Strand, from: number, to: number | null | undefined): string | null {
  const all = segments(st);
  const end = to == null ? all.length : to - 1;
  const segs = all.slice(Math.max(0, from - 1), end);
  return segs.length ? pathOf(segs) : null;
}

function endArrows(st: Strand, key: string): preact.JSX.Element[] {
  const P = parse(st.pts);
  if (P.length < 2) return [];
  const ends: [V, V][] = [
    [P[0], P[1]],
    [P[P.length - 1], P[P.length - 2]]
  ];
  if (st.dbl) ends.pop();
  return ends.map(([tip, prev], i) => {
    const t = unit({ x: tip.x - prev.x, y: tip.y - prev.y });
    const n = { x: -t.y, y: t.x };
    const base = { x: tip.x + t.x * 8, y: tip.y + t.y * 8 };
    const pt = { x: base.x + t.x * 18, y: base.y + t.y * 18 };
    const d = `M${f(base.x + n.x * 10)} ${f(base.y + n.y * 10)}L${f(pt.x)} ${f(pt.y)}L${f(base.x - n.x * 10)} ${f(base.y - n.y * 10)}Z`;
    return <path d={d} class="k-pull" key={`${key}-${i}`} />;
  });
}

export function KnotSVG({ knot, frame, next, label }: { knot: Knot; frame: Frame; next?: Frame; label?: string }) {
  const strands = frame.strands ?? knot.strands;
  const items: Item[] = [];
  (knot.objs ?? []).forEach((o, i) => items.push(objItem(o, i)));
  strands.forEach((st, i) => items.push(...ropeItems(st, i, frame.n?.[i])));
  items.sort((a, b) => a.z - b.z || a.order - b.order);

  const arrows: string[] = [];
  if (next && !next.strands && !frame.strands) {
    strands.forEach((st, i) => {
      const a = frame.n?.[i];
      const b = next.n?.[i];
      const total = parse(st.pts).length;
      const aN = a == null ? total : a;
      const bN = b == null ? total : b;
      if (bN > aN && aN > 0) {
        const d = nextArrow(st, aN, b);
        if (d) arrows.push(d);
      }
    });
  }
  if (frame.arrow) {
    const P = parse(frame.arrow);
    arrows.push(pathOf(segments({ pts: frame.arrow }).slice(0, P.length - 1)));
  }

  return (
    <svg viewBox={knot.vb ?? '0 0 300 300'} class="knot-svg" role="img" aria-label={label ?? knot.name}>
      <defs>
        <marker id="k-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" class="k-head" />
        </marker>
      </defs>
      {items.map((it) => it.el)}
      {arrows.map((d, i) => (
        <path d={d} class="k-next" marker-end="url(#k-head)" key={`a${i}`} />
      ))}
      {frame.pull && strands.flatMap((st, i) => endArrows(st, `p${i}`))}
    </svg>
  );
}
