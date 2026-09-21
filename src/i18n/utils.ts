export const locales = ['zh', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof import('./ui')['default'];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** locale 前缀：默认语言为空串，其余为 /en /ja；统一输出尾部单斜杠 */
export function localePath(locale: Locale, path: string): string {
  const trimmed = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  const clean = trimmed === '/' ? '' : trimmed;
  return locale === 'zh' ? `${clean}/` : `/${locale}${clean}/`;
}
