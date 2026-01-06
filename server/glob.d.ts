/* eslint-disable */

declare module 'glob:./sources/{*.ts,**/index.ts}' {
  export const devto: typeof import('./sources/devto')
  export const freecodecamp: typeof import('./sources/freecodecamp')
  export const github: typeof import('./sources/github')
  export const hackernews: typeof import('./sources/hackernews')
  export const medium: typeof import('./sources/medium')
  export const openai: typeof import('./sources/openai')
  export const producthunt: typeof import('./sources/producthunt')
  export const steam: typeof import('./sources/steam')
}
