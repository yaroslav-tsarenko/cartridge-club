export type Platform = "Steam" | "Epic" | "Xbox" | "PlayStation" | "Nintendo";
export type Accent = "sun" | "leaf" | "grape" | "tangerine" | "red" | "cobalt";

export type Game = {
  id: string;
  title: string;
  platform: Platform;
  genres: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  region: string;
  instant: boolean;
  tag?: { label: string; accent: Accent };
  cover: { hue: string; sub: string };
  releaseYear: number;
};

// Covers rendered as flat "boxed edition" plates (cheap flat-color rendering).
export const games: Game[] = [
  {
    id: "nova-drift",
    title: "Nova Drift: Aurora",
    platform: "Steam",
    genres: ["Action", "Roguelike"],
    price: 18.99,
    oldPrice: 34.99,
    rating: 4.8,
    region: "Global",
    instant: true,
    tag: { label: "-46%", accent: "sun" },
    cover: { hue: "#2B5CE6", sub: "#7A4FD0" },
    releaseYear: 2024,
  },
  {
    id: "pixel-peaks",
    title: "Pixel Peaks",
    platform: "Nintendo",
    genres: ["Platformer", "Indie"],
    price: 12.49,
    oldPrice: 24.99,
    rating: 4.9,
    region: "EU",
    instant: true,
    tag: { label: "Bestseller", accent: "tangerine" },
    cover: { hue: "#3BAA57", sub: "#FFCB3D" },
    releaseYear: 2023,
  },
  {
    id: "grand-circuit",
    title: "Grand Circuit '98",
    platform: "PlayStation",
    genres: ["Racing", "Arcade"],
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.6,
    region: "Global",
    instant: true,
    tag: { label: "-25%", accent: "sun" },
    cover: { hue: "#F5793B", sub: "#E5484D" },
    releaseYear: 2025,
  },
  {
    id: "star-relic",
    title: "Star Relic Saga",
    platform: "Xbox",
    genres: ["RPG", "Adventure"],
    price: 44.99,
    rating: 4.7,
    region: "Global",
    instant: true,
    tag: { label: "New!", accent: "cobalt" },
    cover: { hue: "#7A4FD0", sub: "#2B5CE6" },
    releaseYear: 2026,
  },
  {
    id: "deep-harbor",
    title: "Deep Harbor",
    platform: "Epic",
    genres: ["Strategy", "Sim"],
    price: 8.99,
    oldPrice: 19.99,
    rating: 4.5,
    region: "Global",
    instant: true,
    tag: { label: "-55%", accent: "sun" },
    cover: { hue: "#2B5CE6", sub: "#3BAA57" },
    releaseYear: 2022,
  },
  {
    id: "hex-hollow",
    title: "Hex Hollow",
    platform: "Steam",
    genres: ["Puzzle", "Indie"],
    price: 6.49,
    oldPrice: 14.99,
    rating: 4.8,
    region: "Global",
    instant: true,
    tag: { label: "-57%", accent: "sun" },
    cover: { hue: "#3BAA57", sub: "#1E2433" },
    releaseYear: 2023,
  },
  {
    id: "iron-vanguard",
    title: "Iron Vanguard II",
    platform: "Steam",
    genres: ["Shooter", "Co-op"],
    price: 49.99,
    rating: 4.9,
    region: "Global",
    instant: true,
    tag: { label: "Pre-order", accent: "grape" },
    cover: { hue: "#E5484D", sub: "#1E2433" },
    releaseYear: 2026,
  },
  {
    id: "meadow-tale",
    title: "Meadow Tale",
    platform: "Nintendo",
    genres: ["Cozy", "Sim"],
    price: 21.99,
    oldPrice: 29.99,
    rating: 4.7,
    region: "EU",
    instant: true,
    tag: { label: "-27%", accent: "sun" },
    cover: { hue: "#FFCB3D", sub: "#3BAA57" },
    releaseYear: 2024,
  },
  {
    id: "cyber-alley",
    title: "Cyber Alley",
    platform: "Epic",
    genres: ["Action", "Cyberpunk"],
    price: 33.99,
    oldPrice: 59.99,
    rating: 4.4,
    region: "Global",
    instant: true,
    tag: { label: "-43%", accent: "sun" },
    cover: { hue: "#7A4FD0", sub: "#F5793B" },
    releaseYear: 2025,
  },
  {
    id: "final-lap",
    title: "Final Lap Legends",
    platform: "PlayStation",
    genres: ["Racing", "Sports"],
    price: 27.49,
    oldPrice: 49.99,
    rating: 4.6,
    region: "Global",
    instant: true,
    tag: { label: "Bestseller", accent: "tangerine" },
    cover: { hue: "#F5793B", sub: "#FFCB3D" },
    releaseYear: 2024,
  },
];

export const bargainBin: Game[] = [
  {
    id: "blip-quest",
    title: "Blip Quest",
    platform: "Steam",
    genres: ["Arcade"],
    price: 2.99,
    oldPrice: 9.99,
    rating: 4.3,
    region: "Global",
    instant: true,
    cover: { hue: "#3BAA57", sub: "#FFCB3D" },
    releaseYear: 2021,
  },
  {
    id: "maze-mania",
    title: "Maze Mania",
    platform: "Nintendo",
    genres: ["Puzzle"],
    price: 4.49,
    oldPrice: 14.99,
    rating: 4.5,
    region: "EU",
    instant: true,
    cover: { hue: "#2B5CE6", sub: "#E5484D" },
    releaseYear: 2020,
  },
  {
    id: "turbo-toss",
    title: "Turbo Toss",
    platform: "Xbox",
    genres: ["Sports"],
    price: 3.99,
    oldPrice: 12.99,
    rating: 4.2,
    region: "Global",
    instant: true,
    cover: { hue: "#F5793B", sub: "#7A4FD0" },
    releaseYear: 2019,
  },
  {
    id: "ghost-lane",
    title: "Ghost Lane",
    platform: "Epic",
    genres: ["Horror"],
    price: 5.99,
    oldPrice: 19.99,
    rating: 4.6,
    region: "Global",
    instant: true,
    cover: { hue: "#7A4FD0", sub: "#1E2433" },
    releaseYear: 2022,
  },
];

export const platforms: { name: Platform; glyph: string }[] = [
  { name: "Steam", glyph: "◈" },
  { name: "Epic", glyph: "◆" },
  { name: "Xbox", glyph: "✕" },
  { name: "PlayStation", glyph: "△" },
  { name: "Nintendo", glyph: "◉" },
];

export const genres = [
  { name: "Action", accent: "red" as Accent },
  { name: "RPG", accent: "grape" as Accent },
  { name: "Strategy", accent: "cobalt" as Accent },
  { name: "Racing", accent: "tangerine" as Accent },
  { name: "Indie", accent: "leaf" as Accent },
  { name: "Puzzle", accent: "sun" as Accent },
  { name: "Shooter", accent: "red" as Accent },
  { name: "Cozy", accent: "leaf" as Accent },
  { name: "Sports", accent: "cobalt" as Accent },
  { name: "Horror", accent: "grape" as Accent },
];

export const navTabs = [
  "Platforms",
  "Genres",
  "Deals",
  "New Releases",
  "Pre-orders",
  "Top Charts",
  "Gift Cards",
];

export const promoStrip = [
  "Instant delivery",
  "Official keys",
  "Collector-approved",
  "Secure payment",
  "Rated 4.9 / 5",
];
