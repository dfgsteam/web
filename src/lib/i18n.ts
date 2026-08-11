export type Locale = 'de' | 'en';

import { de } from '../i18n/de';
import { en } from '../i18n/en';

export const dictionaries = { de, en } as const;

export type Dict = typeof de;

export function getDict(locale?: string): Dict {
  return locale === 'en' ? en : de;
}

export function getLang(url: URL): Locale {
  return url.pathname.startsWith('/en') ? 'en' : 'de';
}

export function getLocale(url: URL): Locale {
  return getLang(url);
}
