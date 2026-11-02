/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:guide/*' {
  const pages: import('./lib/guide-types').GuidePage[];
  export default pages;
}
