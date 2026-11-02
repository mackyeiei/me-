import { kvGet, kvSet, newId } from './db';

export interface Trigger { id: string; ifText: string; thenText: string }
export interface Rally { id: string; name: string; note: string; pinId?: string }
export interface Contact { id: string; name: string; phone: string }
export interface BagItem { id: string; text: string; done: boolean }

export interface Plan {
  v: 1;
  triggers: Trigger[];
  rally: Rally[];
  contacts: Contact[];
  bag: BagItem[];
  medical: string;
}

const c = (name: string, phone: string): Contact => ({ id: newId(), name, phone });
const b = (text: string): BagItem => ({ id: newId(), text, done: false });

export function defaultPlan(): Plan {
  return {
    v: 1,
    triggers: [
      {
        id: newId(),
        ifText: 'Fire alarm + smoke in the building',
        thenText: 'Stairs, never the lift. Go to Rally 1. Do not go back for things.'
      },
      {
        id: newId(),
        ifText: 'Flood water reaches the street outside',
        thenText: 'Move go-bag + water upstairs. Switch off main power if water may reach sockets.'
      },
      {
        id: newId(),
        ifText: 'Phones down and family not reachable for 6 hours',
        thenText: 'Go to Rally 2 at the next full hour and wait 1 hour.'
      }
    ],
    rally: [
      { id: newId(), name: 'Rally 1 (near home)', note: 'Outside the building, a spot everyone knows.' },
      { id: newId(), name: 'Rally 2 (out of area)', note: 'Friend / family place in another district.' }
    ],
    contacts: [
      c('Ambulance / EMS', '1669'),
      c('Police', '191'),
      c('Fire', '199'),
      c('Tourist police', '1155'),
      c('Disaster hotline (DDPM)', '1784')
    ],
    bag: [
      'Water 3 L + bottle',
      'Water purification tablets',
      'ORS / electrolyte packets',
      'Food for 3 days (no cooking)',
      'Headlamp + spare batteries',
      'Power bank (charged) + cable',
      'Cash in small notes',
      'ID / passport copies in zip bag',
      'Medicines for 7 days',
      'First aid kit',
      'N95 masks (smoke, PM2.5)',
      'Whistle',
      'Rain poncho',
      'Multitool / knife',
      'Paracord 15 m',
      'Lighter + matches in zip bag',
      'Emergency blanket',
      'Hand sanitizer + soap',
      'Spare glasses / contacts',
      'Change of clothes + socks'
    ].map(b),
    medical: ''
  };
}

export function isPlan(x: unknown): x is Plan {
  const p = x as Plan;
  return (
    !!p &&
    typeof p === 'object' &&
    Array.isArray(p.triggers) &&
    Array.isArray(p.rally) &&
    Array.isArray(p.contacts) &&
    Array.isArray(p.bag) &&
    typeof p.medical === 'string'
  );
}

export async function loadPlan(): Promise<Plan> {
  const p = await kvGet<Plan>('plan');
  if (isPlan(p)) return p;
  const fresh = defaultPlan();
  await kvSet('plan', fresh);
  return fresh;
}

export const savePlan = (p: Plan) => kvSet('plan', p);
