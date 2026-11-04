/** 24px line icons (stroke = currentColor). */
const P: Record<string, string> = {
  // tabs
  map: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z',
  guide: 'M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3M8 7h8M8 11h6',
  knots: 'M5 19c3-3 3-7 7-7s4-4 7-7M5 5c3 3 3 7 7 7s4 4 7 7M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
  plan: 'M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 2h6v4H9zM9 13l2 2 4-4',
  tools: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  // ui
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  check: 'M4 12l5 5L20 6',
  alert: 'M12 3l10 18H2zM12 10v5M12 18v.5',
  phone: 'M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z',
  pin: 'M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  heart: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11zM8 11h2l1-2 2 4 1-2h2',
  save: 'M5 3h11l3 3v15H5zM8 3v5h7V3M8 21v-7h8v7',
  bag: 'M6 8h12l-1 13H7zM9 8V6a3 3 0 0 1 6 0v2',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  // guide sections
  priorities: 'M12 3l10 18H2zM12 10v5M12 18v.5',
  water: 'M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12zM9 15a3 3 0 0 0 3 3',
  food: 'M3 11h18a9 9 0 0 1-18 0zM8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4',
  fire: 'M12 22a7 7 0 0 0 7-7c0-5-4-6-5-11-3 2-4 5-3 8-2-1-2-3-2-3-2 2-4 4-4 6a7 7 0 0 0 7 7zM12 22a3 3 0 0 1-3-3c0-2 3-4 3-4s3 2 3 4a3 3 0 0 1-3 3z',
  shelter: 'M2 20h20M4 20L12 5l8 15M12 5v15M9 20l3-5 3 5',
  firstaid: 'M4 7h16v13H4zM9 7V4h6v3M12 10v7M8.5 13.5h7',
  navigation: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 6l2.5 6L12 18l-2.5-6z',
  signaling: 'M12 12a1 1 0 1 0 0 .01M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8',
  urban: 'M3 21h18M5 21V8l5-3v16M10 21V3h9v18M13 7h3M13 11h3M13 15h3',
  repairs: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  hygiene: 'M9 3h6v3H9zM8 6h8l1 3v12H7V9zM10 13h4M12 11v4',
  bugout: 'M7 7a5 5 0 0 1 10 0v13H7zM7 12h10M10 16h4M9 3h6',
  hacks: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  gear: 'M6 8h12l-1 13H7zM9 8V6a3 3 0 0 1 6 0v2M9 13h6'
};

export function Icon({ name, size }: { name: string; size?: number }) {
  return (
    <svg
      class="icon"
      viewBox="0 0 24 24"
      width={size ?? 22}
      height={size ?? 22}
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={P[name] ?? P.alert} />
    </svg>
  );
}

export function TabIcon({ tab }: { tab: string }) {
  return <Icon name={tab} size={26} />;
}
