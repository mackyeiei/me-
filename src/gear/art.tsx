/**
 * Original two-tone line illustrations for go-bag gear (64×64).
 * .g-ink = outline, .g-fill = colour accent (var --gc), .g-soft = dark fill.
 */
import type { JSX } from 'preact';

const A: Record<string, JSX.Element> = {
  water: (
    <>
      <rect class="g-soft" x="20" y="16" width="24" height="42" rx="6" />
      <path class="g-fill" d="M20 34h24v18a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6z" />
      <path class="g-ink" d="M26 6h12v6H26zM24 12h16l4 6v34a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6V18zM20 34h24M26 42h4" />
    </>
  ),
  tabs: (
    <>
      <rect class="g-soft" x="10" y="14" width="44" height="36" rx="5" />
      <circle class="g-fill" cx="22" cy="26" r="5" />
      <circle class="g-fill" cx="42" cy="26" r="5" />
      <circle class="g-fill" cx="22" cy="40" r="5" />
      <path class="g-ink" d="M15 14h34a5 5 0 0 1 5 5v26a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5z" />
      <circle class="g-ink" cx="42" cy="40" r="5" />
      <circle class="g-ink" cx="22" cy="26" r="5" />
      <circle class="g-ink" cx="42" cy="26" r="5" />
      <circle class="g-ink" cx="22" cy="40" r="5" />
    </>
  ),
  ors: (
    <>
      <path class="g-soft" d="M16 12h32v42H16z" />
      <path class="g-fill" d="M32 24s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12z" />
      <path class="g-ink" d="M16 12l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4v42H16zM16 46h32M26 51h12" />
    </>
  ),
  food: (
    <>
      <path class="g-soft" d="M14 18h36v30a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6z" />
      <path class="g-fill" d="M14 28h36v14H14z" />
      <ellipse class="g-ink" cx="32" cy="18" rx="18" ry="6" />
      <path class="g-ink" d="M14 18v30c0 3.3 8 6 18 6s18-2.7 18-6V18M14 28c0 3.3 8 6 18 6s18-2.7 18-6M14 42c0 3.3 8 6 18 6s18-2.7 18-6M26 16h12" />
    </>
  ),
  headlamp: (
    <>
      <path class="g-fill" d="M38 22l20-8v32l-20-8z" opacity=".55" />
      <rect class="g-soft" x="22" y="20" width="18" height="20" rx="5" />
      <circle class="g-fill" cx="31" cy="30" r="5" />
      <path class="g-ink" d="M27 20h8a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-8a5 5 0 0 1-5-5V25a5 5 0 0 1 5-5zM22 27C12 27 6 32 6 38s8 12 26 12 26-4 26-10M40 22l18-7M40 38l18 7" />
    </>
  ),
  powerbank: (
    <>
      <rect class="g-soft" x="16" y="8" width="32" height="50" rx="7" />
      <path class="g-fill" d="M34 16l-10 18h8l-2 14 10-18h-8z" />
      <path class="g-ink" d="M23 8h18a7 7 0 0 1 7 7v36a7 7 0 0 1-7 7H23a7 7 0 0 1-7-7V15a7 7 0 0 1 7-7zM28 4h8" />
    </>
  ),
  cash: (
    <>
      <rect class="g-soft" x="6" y="18" width="52" height="30" rx="4" />
      <circle class="g-fill" cx="32" cy="33" r="8" />
      <path class="g-ink" d="M10 18h44a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4zM14 26v14M50 26v14M10 14h44" />
      <path class="g-ink" d="M32 29v8" />
    </>
  ),
  docs: (
    <>
      <rect class="g-soft" x="8" y="10" width="48" height="46" rx="5" />
      <rect class="g-fill" x="18" y="18" width="24" height="32" rx="3" />
      <path class="g-ink" d="M8 16h48M13 10h38a5 5 0 0 1 5 5v36a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5z" />
      <path class="g-ink" d="M21 18h18a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H21a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3zM30 27a4 4 0 1 0 0 .01M24 42h12" />
    </>
  ),
  meds: (
    <>
      <rect class="g-soft" x="12" y="18" width="26" height="38" rx="5" />
      <rect class="g-fill" x="12" y="28" width="26" height="16" />
      <path class="g-ink" d="M10 10h30v8H10zM12 18h26v33a5 5 0 0 1-5 5H17a5 5 0 0 1-5-5zM12 28h26M12 44h26" />
      <path class="g-fill" d="M46 40l8-8a5.7 5.7 0 0 1 8 8l-8 8a5.7 5.7 0 0 1-8-8z" />
      <path class="g-ink" d="M46 40l8-8a5.7 5.7 0 0 1 8 8l-8 8a5.7 5.7 0 0 1-8-8zM50 36l8 8" />
    </>
  ),
  firstaid: (
    <>
      <rect class="g-soft" x="6" y="18" width="52" height="38" rx="6" />
      <path class="g-fill" d="M27 26h10v8h8v10h-8v8H27v-8h-8V34h8z" />
      <path class="g-ink" d="M12 18h40a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6zM24 18v-6h16v6" />
    </>
  ),
  mask: (
    <>
      <path class="g-fill" d="M14 26c0-6 8-12 18-12s18 6 18 12v6c0 10-8 18-18 18S14 42 14 32z" />
      <path class="g-ink" d="M14 26c0-6 8-12 18-12s18 6 18 12v6c0 10-8 18-18 18S14 42 14 32zM14 26L4 20M14 36L4 44M50 26l10-6M50 36l10 8M26 30h12" />
    </>
  ),
  whistle: (
    <>
      <path class="g-fill" d="M8 30a14 14 0 1 0 28 0z" />
      <path class="g-ink" d="M8 30a14 14 0 1 0 28 0V22h22v8H36M22 22v-6M14 12l-4-4M30 12l4-4" />
      <circle class="g-ink" cx="22" cy="32" r="4" />
    </>
  ),
  poncho: (
    <>
      <path class="g-fill" d="M32 6c-6 0-10 5-10 10l-14 36h48L42 16c0-5-4-10-10-10z" />
      <path class="g-ink" d="M32 6c-6 0-10 5-10 10l-14 36h48L42 16c0-5-4-10-10-10zM26 16a6 6 0 0 0 12 0M32 22v30" />
      <path class="g-ink" d="M14 58l2-6M50 58l-2-6M22 60l1-6M42 60l-1-6" />
    </>
  ),
  knife: (
    <>
      <path class="g-soft" d="M8 40l30-16 12 6-30 18z" />
      <path class="g-fill" d="M20 48l30-18 6 6c4 4 2 8-2 10L26 56z" />
      <path class="g-ink" d="M20 48l30-18 6 6c4 4 2 8-2 10L26 56zM8 40l30-16 12 6M8 40l12 8M30 46a2 2 0 1 0 0 .01M42 39a2 2 0 1 0 0 .01" />
    </>
  ),
  cord: (
    <>
      <ellipse class="g-soft" cx="32" cy="32" rx="22" ry="20" />
      <path class="g-fill" d="M48 46l10 10-4 2-10-8z" />
      <ellipse class="g-ink" cx="32" cy="32" rx="22" ry="20" />
      <ellipse class="g-ink" cx="32" cy="32" rx="15" ry="13" />
      <ellipse class="g-ink" cx="32" cy="32" rx="8" ry="6" />
      <path class="g-ink" d="M48 46l10 10" />
    </>
  ),
  fire: (
    <>
      <rect class="g-soft" x="20" y="26" width="20" height="32" rx="4" />
      <path class="g-fill" d="M30 4c4 6 8 9 8 14a8 8 0 0 1-16 0c0-3 2-5 3-7 1 3 3 3 3 3s-2-5 2-10z" />
      <path class="g-ink" d="M24 26h12a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V30a4 4 0 0 1 4-4zM20 34h20M24 26v-2h12v2" />
    </>
  ),
  blanket: (
    <>
      <path class="g-fill" d="M10 14l40-4 6 40-42 6z" />
      <path class="g-ink" d="M10 14l40-4 6 40-42 6zM10 14l20 18 26 18M50 10L30 32 14 56M24 24l10-2M38 40l4 8" />
    </>
  ),
  soap: (
    <>
      <path class="g-soft" d="M18 24h28v28a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" />
      <path class="g-fill" d="M18 38h28v14a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" />
      <path class="g-ink" d="M18 24h28v28a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6zM26 24v-6h12v6M30 18v-8h14M30 10h-6" />
      <circle class="g-ink" cx="52" cy="16" r="3" />
    </>
  ),
  glasses: (
    <>
      <circle class="g-fill" cx="18" cy="36" r="11" opacity=".55" />
      <circle class="g-fill" cx="46" cy="36" r="11" opacity=".55" />
      <circle class="g-ink" cx="18" cy="36" r="11" />
      <circle class="g-ink" cx="46" cy="36" r="11" />
      <path class="g-ink" d="M29 34c2-3 4-3 6 0M7 34L4 24M57 34l3-10" />
    </>
  ),
  clothes: (
    <>
      <path class="g-fill" d="M22 8l-14 8 6 12 6-3v31h24V25l6 3 6-12-14-8c-2 4-6 6-10 6s-8-2-10-6z" />
      <path class="g-ink" d="M22 8l-14 8 6 12 6-3v31h24V25l6 3 6-12-14-8c-2 4-6 6-10 6s-8-2-10-6z" />
    </>
  ),
  radio: (
    <>
      <rect class="g-soft" x="6" y="22" width="52" height="34" rx="6" />
      <circle class="g-fill" cx="22" cy="39" r="9" />
      <path class="g-ink" d="M12 22h40a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6zM16 22L46 6M38 32h12M38 38h12M38 44h8" />
      <circle class="g-ink" cx="22" cy="39" r="9" />
    </>
  ),
  tape: (
    <>
      <circle class="g-fill" cx="28" cy="32" r="20" />
      <circle class="g-soft" cx="28" cy="32" r="9" />
      <path class="g-ink" d="M28 12a20 20 0 1 0 0 40M28 52h28l-4-6 4-6H40M28 23a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
      <path class="g-ink" d="M28 12a20 20 0 0 1 12 36" />
    </>
  ),
  battery: (
    <>
      <rect class="g-soft" x="10" y="20" width="18" height="36" rx="4" />
      <rect class="g-soft" x="36" y="20" width="18" height="36" rx="4" />
      <path class="g-fill" d="M10 38h18v14a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4zM36 30h18v22a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4z" />
      <path class="g-ink" d="M14 20h10a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4zM16 20v-4h6v4M40 20h10a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4zM42 20v-4h6v4" />
    </>
  ),
  zipbag: (
    <>
      <rect class="g-soft" x="10" y="14" width="44" height="42" rx="4" />
      <path class="g-fill" d="M10 14h44v8H10z" />
      <path class="g-ink" d="M14 14h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4zM10 22h44M20 34h24M20 42h16" />
    </>
  ),
  bag: (
    <>
      <path class="g-soft" d="M14 22a10 10 0 0 1 10-10h16a10 10 0 0 1 10 10v32H14z" />
      <path class="g-fill" d="M20 34h24v14H20z" />
      <path class="g-ink" d="M14 22a10 10 0 0 1 10-10h16a10 10 0 0 1 10 10v32a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4zM24 12V8a8 8 0 0 1 16 0v4M20 34h24v14H20zM28 40h8M14 28h36" />
    </>
  ),
  fan: (
    <>
      <circle class="g-soft" cx="32" cy="28" r="22" />
      <path class="g-fill" d="M32 28c-2-8 0-14 6-16 4 6 0 12-6 16zM32 28c8-2 14 0 16 6-6 4-12 0-16-6zM32 28c2 8 0 14-6 16-4-6 0-12 6-16zM32 28c-8 2-14 0-16-6 6-4 12 0 16 6z" />
      <path class="g-ink" d="M32 6a22 22 0 1 0 0 44 22 22 0 0 0 0-44zM32 50v8M22 58h20" />
    </>
  )
};

export function GearArt({ name, color }: { name: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 64" class="gear-art" aria-hidden="true" style={color ? `--gc:${color}` : undefined}>
      {A[name] ?? A.bag}
    </svg>
  );
}

/** Pick an illustration for a free-text checklist item. */
const MATCH: [RegExp, string][] = [
  [/purif|tablet|aquatab|filter/i, 'tabs'],
  [/ors|electrolyte|salt/i, 'ors'],
  [/water|bottle/i, 'water'],
  [/food|can|snack|ration|noodle/i, 'food'],
  [/head ?lamp|torch|flashlight|light/i, 'headlamp'],
  [/power ?bank|charger|cable/i, 'powerbank'],
  [/cash|money|baht/i, 'cash'],
  [/\bid\b|passport|document|copies|paper/i, 'docs'],
  [/medic|pill|drug|prescription/i, 'meds'],
  [/first aid|bandage|kit/i, 'firstaid'],
  [/mask|n95|kn95|pm2/i, 'mask'],
  [/whistle/i, 'whistle'],
  [/poncho|rain/i, 'poncho'],
  [/knife|multi ?tool/i, 'knife'],
  [/cord|rope|paracord/i, 'cord'],
  [/lighter|match|fire/i, 'fire'],
  [/blanket|foil|bivvy/i, 'blanket'],
  [/sanitizer|soap|hygiene|wipes/i, 'soap'],
  [/glasses|contact/i, 'glasses'],
  [/cloth|sock|shirt|underwear/i, 'clothes'],
  [/radio/i, 'radio'],
  [/tape/i, 'tape'],
  [/batter/i, 'battery'],
  [/zip|bag/i, 'zipbag']
];
export function artFor(text: string): string {
  for (const [re, name] of MATCH) if (re.test(text)) return name;
  return 'bag';
}
