// Countries excluded from registration (sanctions / restricted).
// Kept in one place so the list is easy to extend.
export const BLOCKED_COUNTRIES = [
  "Russia",
  "Belarus",
  "Iran",
  "North Korea",
];

// Common shipping/billing countries for a UK-based store, minus blocked ones.
const ALL_COUNTRIES = [
  "United Kingdom",
  "Ireland",
  "United States",
  "Canada",
  "Australia",
  "New Zealand",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Luxembourg",
  "Austria",
  "Switzerland",
  "Portugal",
  "Denmark",
  "Sweden",
  "Norway",
  "Finland",
  "Iceland",
  "Poland",
  "Czech Republic",
  "Slovakia",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Greece",
  "Croatia",
  "Slovenia",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Ukraine",
  "Turkey",
  "United Arab Emirates",
  "Saudi Arabia",
  "Israel",
  "Japan",
  "South Korea",
  "Singapore",
  "Hong Kong",
  "Malaysia",
  "Thailand",
  "Philippines",
  "Indonesia",
  "India",
  "Brazil",
  "Mexico",
  "Argentina",
  "Chile",
  "South Africa",
];

export const COUNTRIES = ALL_COUNTRIES.filter(
  (c) => !BLOCKED_COUNTRIES.includes(c)
).sort();

export function isCountryAllowed(country: string): boolean {
  return COUNTRIES.includes(country);
}
