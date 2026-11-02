/**
 * Compiles content/<locale>/*.md into JSON at build time.
 * Import as: import pages from 'virtual:guide/en'
 *
 * Front matter (required): id, title, section, order, sources (list)
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { marked } from 'marked';
import type { Plugin } from 'vite';

const PREFIX = 'virtual:guide/';
const RESOLVED = '\0' + PREFIX;

interface Meta {
  id: string;
  title: string;
  section: string;
  order: number;
  sources: string[];
}

function parseFrontMatter(src: string, file: string): { meta: Meta; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(src);
  if (!m) throw new Error(`${file}: missing front matter`);
  const raw: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = /^\s+-\s+(.*)$/.exec(line);
    if (item && listKey) {
      (raw[listKey] as string[]).push(item[1].trim());
      continue;
    }
    const kv = /^([a-zA-Z_]+):\s*(.*)$/.exec(line);
    if (!kv) throw new Error(`${file}: bad front matter line "${line}"`);
    if (kv[2] === '') {
      listKey = kv[1];
      raw[listKey] = [];
    } else {
      listKey = null;
      raw[kv[1]] = kv[2].trim();
    }
  }
  for (const k of ['id', 'title', 'section', 'order']) {
    if (typeof raw[k] !== 'string') throw new Error(`${file}: front matter "${k}" is required`);
  }
  const sources = raw.sources;
  if (!Array.isArray(sources) || sources.length === 0) {
    throw new Error(`${file}: every guide page must cite at least one source`);
  }
  return {
    meta: {
      id: raw.id as string,
      title: raw.title as string,
      section: raw.section as string,
      order: Number(raw.order),
      sources
    },
    body: m[2]
  };
}

function compile(dir: string) {
  if (!existsSync(dir)) return [];
  const pages = readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const file = join(dir, f);
      const { meta, body } = parseFrontMatter(readFileSync(file, 'utf8'), f);
      const html = marked.parse(body, { async: false }) as string;
      const text = html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return { ...meta, html, text };
    });
  const ids = new Set<string>();
  for (const p of pages) {
    if (ids.has(p.id)) throw new Error(`duplicate guide id "${p.id}"`);
    ids.add(p.id);
  }
  return pages.sort((a, b) => a.section.localeCompare(b.section) || a.order - b.order);
}

export function guideContent(contentDir = 'content'): Plugin {
  const root = resolve(contentDir);
  return {
    name: 'guide-content',
    resolveId(id) {
      if (id.startsWith(PREFIX)) return '\0' + id;
    },
    load(id) {
      if (!id.startsWith(RESOLVED)) return;
      const locale = id.slice(RESOLVED.length);
      const dir = join(root, locale);
      if (existsSync(dir)) {
        for (const f of readdirSync(dir)) this.addWatchFile(join(dir, f));
      }
      return `export default ${JSON.stringify(compile(dir))};`;
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(root)) {
        for (const mod of server.moduleGraph.idToModuleMap.values()) {
          if (mod.id?.startsWith(RESOLVED)) server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    }
  };
}
