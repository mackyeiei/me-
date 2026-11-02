import { useEffect, useRef, useState } from 'preact/hooks';
import { t } from '../i18n';
import { newId, pinsAll, type Pin } from '../lib/db';
import { loadPlan, savePlan, type Plan } from '../lib/plan';
import { exportBackup, parseBackup, restoreBackup } from '../lib/backup';

type Lists = 'triggers' | 'rally' | 'contacts' | 'bag';
const val = (e: Event) => (e.currentTarget as HTMLInputElement).value;

export default function PlanTab() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [msg, setMsg] = useState('');
  const pending = useRef<Plan | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement>(null);

  const reload = () => {
    loadPlan().then(setPlan);
    pinsAll().then(setPins).catch(() => setPins([]));
  };

  useEffect(() => {
    reload();
    // Flush unsaved edits if the app is backgrounded/closed.
    const flush = () => {
      if (pending.current) {
        clearTimeout(timer.current);
        savePlan(pending.current);
        pending.current = null;
      }
    };
    const onVis = () => document.visibilityState === 'hidden' && flush();
    document.addEventListener('visibilitychange', onVis);
    addEventListener('pagehide', flush);
    return () => {
      flush();
      document.removeEventListener('visibilitychange', onVis);
      removeEventListener('pagehide', flush);
    };
  }, []);

  if (!plan) return <p class="muted">{t('common.loading')}</p>;

  const commit = (next: Plan) => {
    setPlan(next);
    pending.current = next;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (pending.current) savePlan(pending.current);
      pending.current = null;
    }, 400);
  };

  function edit<K extends Lists>(list: K, id: string, patch: Partial<Plan[K][number]>) {
    commit({ ...plan!, [list]: (plan![list] as { id: string }[]).map((x) => (x.id === id ? { ...x, ...patch } : x)) });
  }
  function add<K extends Lists>(list: K, item: Omit<Plan[K][number], 'id'>) {
    commit({ ...plan!, [list]: [...plan![list], { id: newId(), ...item }] });
  }
  function remove(list: Lists, id: string) {
    if (!confirm(t('plan.confirmDelete'))) return;
    commit({ ...plan!, [list]: (plan![list] as { id: string }[]).filter((x) => x.id !== id) });
  }

  async function onImport(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const b = parseBackup(await file.text());
    if (!b) return setMsg(t('plan.importBad'));
    if (!confirm(t('plan.importConfirm'))) return;
    clearTimeout(timer.current);
    pending.current = null;
    await restoreBackup(b);
    reload();
    setMsg(t('plan.importOk'));
  }

  const done = plan.bag.filter((x) => x.done).length;

  return (
    <div class="plan">
      <p class="muted">{t('plan.savedLocal')}</p>

      <details open>
        <summary>{t('plan.triggers')}</summary>
        <p class="muted">{t('plan.triggersHint')}</p>
        {plan.triggers.map((r) => (
          <div class="row-card" key={r.id}>
            <label class="lbl">{t('plan.if')}</label>
            <textarea rows={2} value={r.ifText} onInput={(e) => edit('triggers', r.id, { ifText: val(e) })} />
            <label class="lbl">{t('plan.then')}</label>
            <textarea rows={2} value={r.thenText} onInput={(e) => edit('triggers', r.id, { thenText: val(e) })} />
            <button class="danger" onClick={() => remove('triggers', r.id)}>{t('common.delete')}</button>
          </div>
        ))}
        <button class="add" onClick={() => add('triggers', { ifText: '', thenText: '' })}>+ {t('plan.addTrigger')}</button>
      </details>

      <details open>
        <summary>{t('plan.rally')}</summary>
        {pins.length === 0 && <p class="muted">{t('plan.rallyNoPins')}</p>}
        {plan.rally.map((r) => (
          <div class="row-card" key={r.id}>
            <input aria-label={t('plan.rallyName')} placeholder={t('plan.rallyName')} value={r.name} onInput={(e) => edit('rally', r.id, { name: val(e) })} />
            <textarea rows={2} aria-label={t('plan.rallyNote')} placeholder={t('plan.rallyNote')} value={r.note} onInput={(e) => edit('rally', r.id, { note: val(e) })} />
            {pins.length > 0 && (
              <>
                <label class="lbl">{t('plan.rallyPin')}</label>
                <select value={r.pinId ?? ''} onChange={(e) => edit('rally', r.id, { pinId: val(e) || undefined })}>
                  <option value="">{t('plan.rallyNoPin')}</option>
                  {pins.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}
                </select>
              </>
            )}
            <button class="danger" onClick={() => remove('rally', r.id)}>{t('common.delete')}</button>
          </div>
        ))}
        <button class="add" onClick={() => add('rally', { name: '', note: '' })}>+ {t('plan.addRally')}</button>
      </details>

      <details open>
        <summary>{t('plan.contacts')}</summary>
        {plan.contacts.map((c) => (
          <div class="row-card contact" key={c.id}>
            <input aria-label={t('plan.contactName')} placeholder={t('plan.contactName')} value={c.name} onInput={(e) => edit('contacts', c.id, { name: val(e) })} />
            <div class="row">
              <input type="tel" inputMode="tel" aria-label={t('plan.contactPhone')} placeholder={t('plan.contactPhone')} value={c.phone} onInput={(e) => edit('contacts', c.id, { phone: val(e) })} />
              {c.phone.trim() && <a class="btn primary" href={`tel:${c.phone.replace(/[^\d+*#]/g, '')}`}>{t('common.call')}</a>}
            </div>
            <button class="danger" onClick={() => remove('contacts', c.id)}>{t('common.delete')}</button>
          </div>
        ))}
        <button class="add" onClick={() => add('contacts', { name: '', phone: '' })}>+ {t('plan.addContact')}</button>
      </details>

      <details open>
        <summary>{t('plan.bag')} · {t('plan.bagCount', { done, total: plan.bag.length })}</summary>
        <ul class="checklist">
          {plan.bag.map((it) => (
            <li key={it.id}>
              <input type="checkbox" aria-label={it.text} checked={it.done} onChange={(e) => edit('bag', it.id, { done: (e.currentTarget as HTMLInputElement).checked })} />
              <input aria-label={t('plan.bagItem')} value={it.text} onInput={(e) => edit('bag', it.id, { text: val(e) })} />
              <button class="icon danger" aria-label={t('common.delete')} onClick={() => remove('bag', it.id)}>✕</button>
            </li>
          ))}
        </ul>
        <div class="row">
          <button class="add" onClick={() => add('bag', { text: '', done: false })}>+ {t('plan.addItem')}</button>
          <button onClick={() => commit({ ...plan, bag: plan.bag.map((x) => ({ ...x, done: false })) })}>{t('plan.uncheckAll')}</button>
        </div>
      </details>

      <details open>
        <summary>{t('plan.medical')}</summary>
        <textarea rows={6} placeholder={t('plan.medicalHint')} value={plan.medical} onInput={(e) => commit({ ...plan, medical: val(e) })} />
      </details>

      <details open>
        <summary>{t('plan.backup')}</summary>
        <p class="muted">{t('plan.backupHint')}</p>
        <div class="stack">
          <button class="primary" onClick={() => exportBackup()}>{t('plan.export')}</button>
          <button onClick={() => fileRef.current?.click()}>{t('plan.import')}</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={onImport} />
        </div>
        {msg && <p role="status" class="status-msg">{msg}</p>}
      </details>
    </div>
  );
}
