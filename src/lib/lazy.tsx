import type { ComponentType } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { t } from '../i18n';

/** Load a tab's code only when it is first shown (keeps the shell small). */
export function lazy<P extends object>(load: () => Promise<{ default: ComponentType<P> }>) {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;
  return function Lazy(props: P) {
    const [, setReady] = useState(!!Loaded);
    useEffect(() => {
      if (Loaded) return;
      let live = true;
      pending ??= load().then((m) => {
        Loaded = m.default;
      });
      pending.then(() => live && setReady(true));
      return () => {
        live = false;
      };
    }, []);
    return Loaded ? <Loaded {...props} /> : <p class="muted">{t('common.loading')}</p>;
  };
}
