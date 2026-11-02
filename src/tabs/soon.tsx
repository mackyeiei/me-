import { t } from '../i18n';

export default function Soon({ phase, text }: { phase: number; text: string }) {
  return (
    <section class="card">
      <h2>{t('soon.title', { n: phase })}</h2>
      <p class="muted">{text}</p>
    </section>
  );
}
