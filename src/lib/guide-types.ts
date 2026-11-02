export interface GuidePage {
  id: string;
  title: string;
  section: string;
  order: number;
  sources: string[];
  /** Rendered HTML (from our own Markdown at build time, trusted). */
  html: string;
  /** Plain text, used by search (phase 4). */
  text: string;
}
