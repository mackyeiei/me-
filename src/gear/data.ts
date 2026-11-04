/**
 * Go-bag gear guide. Prices are rough Bangkok street/online prices in THB (2026),
 * for budgeting only. Shops listed are common chains: 7-Eleven, Boots, Watsons,
 * Big C, Lotus's, HomePro, Global House, Decathlon, Power Buy, Lazada, Shopee.
 */
export interface Gear {
  art: string;
  color: string;
  name: string;
  why: string;
  buy: string;
  price: string;
}

export interface Tier {
  title: string;
  hint: string;
  color: string;
  items: Gear[];
}

export const GEAR: Tier[] = [
  {
    title: 'Start here: the 72-hour core',
    hint: 'About 2,000–3,500 ฿ total if you buy smart. Fits in a 20–30 L backpack.',
    color: '#ffb020',
    items: [
      { art: 'water', color: '#64d2ff', name: 'Water, 3 L + a bottle', why: 'One day of drinking in Bangkok heat. Water runs out first.', buy: '7-Eleven, Big C. Tough bottle: Decathlon.', price: '15–30 ฿ per 1.5 L · bottle 150–400 ฿' },
      { art: 'tabs', color: '#40c8e0', name: 'Water purification tablets', why: 'Makes clear water safe without fuel. Light and cheap.', buy: 'Lazada / Shopee (Aquatabs, Micropur), some outdoor shops.', price: '200–450 ฿ for 50 tabs' },
      { art: 'ors', color: '#32d74b', name: 'ORS packets (เกลือแร่)', why: 'Treats dehydration from heat, diarrhoea or vomiting.', buy: 'Any pharmacy, Boots, Watsons.', price: '5–15 ฿ each' },
      { art: 'headlamp', color: '#ffd60a', name: 'Headlamp + spare batteries', why: 'Hands free in a dark stairwell. Beats a phone torch.', buy: 'Decathlon, HomePro, Lazada.', price: '250–700 ฿' },
      { art: 'powerbank', color: '#ffd60a', name: 'Power bank 10,000 mAh + cable', why: '2–3 full phone charges. Charge it monthly.', buy: 'Power Buy, Banana IT, Lazada (Eloop, Anker).', price: '400–900 ฿' },
      { art: 'cash', color: '#32d74b', name: 'Cash in small notes', why: 'QR payments and ATMs die in a blackout.', buy: 'Your bank. Keep 20s and 100s.', price: '2,000–3,000 ฿ kept aside' },
      { art: 'docs', color: '#ff9f0a', name: 'ID copies in a zip bag', why: 'ID card, passport, house registration, insurance. Photos on your phone too.', buy: 'Any print/copy shop.', price: '1–3 ฿ per page' },
      { art: 'meds', color: '#ff6482', name: 'Medicines for 7 days', why: 'Your prescriptions + paracetamol, antihistamine, anti-diarrhoea.', buy: 'Pharmacy. Ask your doctor for a spare week.', price: '100–300 ฿ basics' },
      { art: 'firstaid', color: '#ff5a4e', name: 'First aid kit', why: 'Bandages, gauze, tape, antiseptic, gloves, small scissors.', buy: 'Boots, Watsons, pharmacy, or build your own.', price: '300–800 ฿' },
      { art: 'mask', color: '#a3a3a0', name: 'N95 / KN95 masks', why: 'Smoke, dust and PM2.5 haze. Pack at least 5.', buy: 'Boots, Watsons, pharmacies, 7-Eleven.', price: '25–60 ฿ each' },
      { art: 'whistle', color: '#ff9f0a', name: 'Whistle', why: 'Heard much further than shouting. 3 blasts = help.', buy: 'Decathlon, Lazada.', price: '60–150 ฿' }
    ]
  },
  {
    title: 'Level up',
    hint: 'Add these next, one or two per payday.',
    color: '#64d2ff',
    items: [
      { art: 'food', color: '#ffd60a', name: 'Food for 3 days, no cooking', why: 'Canned tuna, crackers, peanut butter, nuts, energy bars. Rotate every 6–12 months.', buy: '7-Eleven, Big C, Lotus’s.', price: '300–600 ฿ per person' },
      { art: 'poncho', color: '#64d2ff', name: 'Rain poncho', why: 'Monsoon rain, wind, and a ground sheet in a pinch.', buy: '7-Eleven (thin), Decathlon (tough).', price: '30–400 ฿' },
      { art: 'knife', color: '#a3a3a0', name: 'Multitool', why: 'Cut, pry, open cans, fix things. Keep it packed, not carried around town.', buy: 'HomePro, Lazada. Buy from official stores.', price: '300–2,500 ฿' },
      { art: 'cord', color: '#bf5af2', name: 'Paracord, 15 m', why: 'Tarp lines, tie-downs, clothesline, repairs. See the Knots tab.', buy: 'Decathlon, Lazada.', price: '100–250 ฿' },
      { art: 'fire', color: '#ff9f0a', name: 'Lighter + matches in a zip bag', why: 'Fire to boil water and cook. Matches as a backup.', buy: '7-Eleven.', price: '10–30 ฿' },
      { art: 'blanket', color: '#ffd60a', name: 'Emergency foil blanket', why: 'Shade (silver side out), rain cover, keep a shocked person warm.', buy: 'Lazada, Shopee, Decathlon.', price: '40–120 ฿' },
      { art: 'soap', color: '#40c8e0', name: 'Soap + hand sanitizer', why: 'Stops stomach bugs when water is short.', buy: '7-Eleven, Watsons.', price: '30–80 ฿' },
      { art: 'tape', color: '#a3a3a0', name: 'Duct tape', why: 'Fix bags, shoes, tarps, seal windows against smoke.', buy: 'HomePro, Global House.', price: '60–150 ฿' },
      { art: 'glasses', color: '#64d2ff', name: 'Spare glasses / contacts', why: 'If you cannot see, you cannot get out.', buy: 'Your old pair works.', price: '0 ฿' },
      { art: 'clothes', color: '#32d74b', name: 'Quick-dry clothes + socks', why: 'Dry socks prevent foot problems after floods.', buy: 'Decathlon, Uniqlo.', price: '200–600 ฿' }
    ]
  },
  {
    title: 'Nice to have',
    hint: 'For longer outages or if you live high up.',
    color: '#32d74b',
    items: [
      { art: 'radio', color: '#ff9f0a', name: 'Crank / solar radio', why: 'News when phones and internet are down. Often has a torch + USB charge.', buy: 'Lazada, Shopee.', price: '400–1,200 ฿' },
      { art: 'battery', color: '#32d74b', name: 'AA / AAA batteries', why: 'For the headlamp and radio. Lithium lasts longest in heat.', buy: '7-Eleven, Big C.', price: '60–250 ฿' },
      { art: 'zipbag', color: '#40c8e0', name: 'Zip bags, assorted', why: 'Waterproof your phone, documents and matches.', buy: 'Big C, Lotus’s.', price: '40–80 ฿ a pack' },
      { art: 'fan', color: '#64d2ff', name: 'USB / rechargeable fan', why: 'Heat is the real danger in a blackout. Wet cloth + fan cools you fast.', buy: 'Lazada, 7-Eleven, Big C.', price: '150–500 ฿' }
    ]
  }
];
