import { en, type StringKey } from './en';

export type Locale = 'en';
// To add Thai: create th.ts (Record<StringKey, string>), add it here, add content/th/*.md.
const dicts: Record<Locale, Record<StringKey, string>> = { en };

export let locale: Locale = 'en';

export function setLocale(l: Locale) {
  locale = l;
  document.documentElement.lang = l;
}

export function t(key: StringKey, vars?: Record<string, string | number>): string {
  let s: string = dicts[locale][key] ?? en[key] ?? key;
  if (vars) for (const k in vars) s = s.replace(`{${k}}`, String(vars[k]));
  return s;
}

export type { StringKey };
