// Catalogue exclusions applied to everything coming back from Kinguin.
//
// Two groups are removed:
//  1. Russia / Belarus related stock (RUB gift cards, local marketplaces,
//     region-locked keys) — those territories are restricted anyway, see
//     /restricted-territories.
//  2. Adult (18+) titles and adult-service gift cards, which we do not sell.

// Any Cyrillic in a title is, in practice, a RU/BY regional listing.
const CYRILLIC = /[Ѐ-ӿ]/;

// Rouble pricing. RUB/RUR are matched case-sensitively so ordinary words
// ("rub") in an English title do not trip the filter.
const ROUBLE = /(\bRUB\b|\bRUR\b|₽)/;

// Marketplaces, operators and services that only exist on the RU/BY market.
const RU_BRANDS = [
  "ozon",
  "yandex",
  "kinopoisk",
  "wildberries",
  "sberbank",
  "sbermarket",
  "tinkoff",
  "megafon",
  "beeline",
  "rostelecom",
  "mail.ru",
  "vkontakte",
  "vk play",
  "vk combo",
  "avito",
  "litres",
  "rutube",
  "okko",
  "ivi.ru",
  "delivery club",
  "samokat",
  "perekrestok",
  "pyaterochka",
  "magnit",
  "detsky mir",
  "letual",
  "dns shop",
  "aeroflot",
  "gazprom",
  "qiwi",
  "yoomoney",
  "webmoney",
  "roblox ru",
  "steam ru",
].map(escape);

const RU_TERMS = new RegExp(
  `(\\b(russia|russian|russia-only|rossiya|belarus|belarusian|moscow|cis region)\\b|${RU_BRANDS.join("|")})`,
  "i"
);

// Regional limitation strings that point at RU/BY activation.
const RU_REGION = /\b(russia|russian federation|belarus|cis)\b/i;

// Adult brands / platforms — distinctive enough to match as substrings.
const ADULT_BRANDS = [
  "onlyfans",
  "pornhub",
  "brazzers",
  "chaturbate",
  "stripchat",
  "camsoda",
  "fansly",
  "bangbros",
  "nutaku",
  "fakku",
  "adult time",
  "adulttime",
].map(escape);

// Adult content keywords. Short/ambiguous words use word boundaries so that
// "Essex", "Scrub" or "Cockpit" style titles are not caught.
const ADULT_TERMS = new RegExp(
  "(" +
    [
      "\\bsex\\b",
      "\\bsexo\\b",
      "sexy",
      "sexual",
      "hentai",
      "\\bporn",
      "\\bxxx\\b",
      "\\bnsfw\\b",
      "erotic",
      "eroge",
      "ecchi",
      "\\bnude\\b",
      "nudity",
      "lewd",
      "\\bmilf",
      "futanari",
      "\\bbdsm\\b",
      "ahegao",
      "bukkake",
      "\\bboobs\\b",
      "\\borgasm",
      "xxx",
      "\\bstrip\\b",
      "\\bstripper",
      "striptease",
      "\\bundress",
      "\\b18\\+",
      "\\bfuck",
      "\\bpussy\\b",
      "\\bbrothel\\b",
      "\\bincest\\b",
      ...ADULT_BRANDS,
    ].join("|") +
    ")",
  "i"
);

// "Adult" on its own is a signal, but only outside these phrases.
const ADULT_WORD = /\badults?\b/i;

// Phrases that contain a blocked word without being a signal themselves
// (the publisher Adult Swim, comic strips, car stripping sims…).
const SAFE_PHRASES = /(adult swim|comic strip|car stripping|strip mall|strip mine)/gi;

// Kinguin genre tags that mark a listing as 18+.
const ADULT_GENRE = /(adult|sexual|nudity|hentai|erotic)/i;

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Title-only check — used where only the product name is available. */
export function isBlockedName(name: string): boolean {
  if (!name) return false;
  if (CYRILLIC.test(name)) return true;
  if (ROUBLE.test(name)) return true;
  const text = name.replace(SAFE_PHRASES, " ");
  if (RU_TERMS.test(text)) return true;
  if (ADULT_TERMS.test(text)) return true;
  if (ADULT_WORD.test(text)) return true;
  return false;
}

export type FilterableProduct = {
  name: string;
  genres?: string[];
  region?: string;
};

/** Full check against a normalised product (name, genres, activation region). */
export function isBlockedProduct(p: FilterableProduct): boolean {
  if (isBlockedName(p.name)) return true;
  if (p.region && RU_REGION.test(p.region)) return true;
  if (p.genres?.some((g) => ADULT_GENRE.test(g))) return true;
  return false;
}
