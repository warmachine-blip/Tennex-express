// Tennex Express — launch product catalog
// Drop into /lib/products.ts in your Next.js project.
// All prices are USD retail. Cost fields are for internal margin math only — do not render.

export type Category =
  | "racquets"
  | "junior"
  | "strings"
  | "overgrips"
  | "dampeners"
  | "bags"
  | "balls"
  | "accessories"
  | "court"
  | "machines";

export type Tag =
  | "beginner-friendly"
  | "intermediate"
  | "kids"
  | "best-seller"
  | "new"
  | "under-30"
  | "under-50"
  | "high-margin"
  | "free-overgrip"
  | "restock-soon";

export interface ProductVariant {
  id: string;
  label: string;            // "Grip size 4 1/4", "23 inch", "Black", etc.
  sku: string;
  priceDelta?: number;      // added to base price
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;        // for tight UI like cards / cart
  category: Category;
  tags: Tag[];
  price: number;            // retail USD
  compareAt?: number;       // optional strikethrough MSRP for "savings vs brand"
  cost: number;             // estimated landed cost — INTERNAL ONLY
  description: string;      // 1–2 sentence pitch
  details: string[];        // bulleted spec list
  images: string[];         // replace with your own once samples land — placeholders for now
  variants?: ProductVariant[];
  rating: number;           // 0–5
  reviewCount: number;
  vendorRef: string;        // matches Vendor List spreadsheet
  inStock: boolean;
  hashtags: string[];       // for Effica-style # tag chips on cards
}

// Helper for margin display in dev mode
export const margin = (p: Product) => (p.price - p.cost) / p.price;

// Placeholder image helper — swap for your own CDN once production assets land.
// Uses picsum with a stable seed per product so cards don't flicker on rebuild.
const img = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/tennex-${seed}/${w}/${h}`;

export const products: Product[] = [
  // ---------- ADULT RACQUETS ----------
  {
    id: "tnx-r-001",
    slug: "rally-100-aluminum",
    name: "Tennex Rally 100 — aluminum 27\"",
    shortName: "Rally 100",
    category: "racquets",
    tags: ["beginner-friendly", "under-50", "best-seller", "free-overgrip"],
    price: 32,
    compareAt: 79,
    cost: 15,
    description:
      "A no-fuss aluminum frame at a price that makes sense. Pre-strung, head cover included, ready to play out of the box.",
    details: [
      "Aluminum alloy frame, 27 inches",
      "Head size 110 sq in, 280g strung",
      "Pre-strung with synthetic gut",
      "Includes padded head cover",
      "Grip sizes: 4 1/4, 4 3/8, 4 1/2",
    ],
    images: [img("rally-100-a"), img("rally-100-b"), img("rally-100-c")],
    variants: [
      { id: "v1", label: "Grip 4 1/4", sku: "TNX-R001-G2", inStock: true },
      { id: "v2", label: "Grip 4 3/8", sku: "TNX-R001-G3", inStock: true },
      { id: "v3", label: "Grip 4 1/2", sku: "TNX-R001-G4", inStock: false },
    ],
    rating: 4.6,
    reviewCount: 218,
    vendorRef: "Hangzhou Pailang Sports",
    inStock: true,
    hashtags: ["#beginner", "#under-50", "#pre-strung"],
  },
  {
    id: "tnx-r-002",
    slug: "rally-pro-graphite",
    name: "Tennex Rally Pro — graphite composite",
    shortName: "Rally Pro",
    category: "racquets",
    tags: ["intermediate", "new"],
    price: 89,
    compareAt: 219,
    cost: 39,
    description:
      "Carbon-aluminum composite for players ready to leave the rec frame behind. Mid-weight, balanced for control.",
    details: [
      "Graphite + aluminum composite",
      "Head size 100 sq in, 295g strung",
      "16x19 string pattern",
      "Pre-strung with synthetic gut",
      "Grip sizes: 4 1/4, 4 3/8, 4 1/2",
    ],
    images: [img("rally-pro-a"), img("rally-pro-b")],
    rating: 4.7,
    reviewCount: 94,
    vendorRef: "Xiamen Verinno",
    inStock: true,
    hashtags: ["#intermediate", "#carbon", "#100-sq-in"],
  },
  {
    id: "tnx-r-003",
    slug: "ace-power-oversize",
    name: "Tennex Ace Power — oversize 110",
    shortName: "Ace Power",
    category: "racquets",
    tags: ["beginner-friendly", "under-50"],
    price: 49,
    compareAt: 129,
    cost: 21,
    description:
      "Bigger head, lighter frame, more forgiveness. Made for players still finding the sweet spot.",
    details: [
      "Aluminum frame with carbon overlay",
      "Head size 110 sq in, 270g strung",
      "Pre-strung, ready to play",
      "Grip sizes: 4 1/4, 4 3/8",
    ],
    images: [img("ace-power-a"), img("ace-power-b")],
    rating: 4.5,
    reviewCount: 156,
    vendorRef: "Hangzhou Hongke Sports",
    inStock: true,
    hashtags: ["#oversize", "#forgiving", "#under-50"],
  },

  // ---------- JUNIOR RACQUETS ----------
  {
    id: "tnx-j-001",
    slug: "junior-23-starter",
    name: "Tennex Junior 23\" — ages 6–8",
    shortName: "Junior 23\"",
    category: "junior",
    tags: ["kids", "under-30", "best-seller"],
    price: 26,
    compareAt: 65,
    cost: 8.5,
    description:
      "The right-sized racquet for kids 6–8. Light enough to swing, sturdy enough to last a season.",
    details: [
      "Aluminum frame, 23 inches",
      "Head size 95 sq in, 215g",
      "Cushioned grip with shock-absorbing handle",
      "Pre-strung with nylon",
      "Includes head cover",
    ],
    images: [img("junior-23-a"), img("junior-23-b")],
    rating: 4.8,
    reviewCount: 312,
    vendorRef: "Fuzhou Dingzuo",
    inStock: true,
    hashtags: ["#kids", "#age-6-8", "#23-inch"],
  },
  {
    id: "tnx-j-002",
    slug: "junior-25-transition",
    name: "Tennex Junior 25\" — ages 8–10",
    shortName: "Junior 25\"",
    category: "junior",
    tags: ["kids", "under-30"],
    price: 29,
    compareAt: 70,
    cost: 10.5,
    description:
      "The transition size for kids working toward an adult frame. Near-adult feel, kid-friendly weight.",
    details: [
      "Aluminum frame, 25 inches",
      "Head size 100 sq in, 245g",
      "Pre-strung with synthetic gut",
      "Includes head cover",
    ],
    images: [img("junior-25-a"), img("junior-25-b")],
    rating: 4.7,
    reviewCount: 174,
    vendorRef: "Caston Sports",
    inStock: true,
    hashtags: ["#kids", "#age-8-10", "#25-inch"],
  },
  {
    id: "tnx-j-003",
    slug: "junior-starter-kit",
    name: "Tennex Junior starter kit",
    shortName: "Junior kit",
    category: "junior",
    tags: ["kids", "under-50", "best-seller"],
    price: 39,
    compareAt: 95,
    cost: 16.5,
    description:
      "Racquet, foam practice balls, and a head cover in one box. The easiest gift for the kid who just said yes to tennis.",
    details: [
      "21\" or 23\" racquet (choose size)",
      "3 red-stage foam practice balls",
      "Padded head cover",
      "Sticker pack",
    ],
    images: [img("junior-kit-a"), img("junior-kit-b")],
    variants: [
      { id: "v1", label: "21 inch (ages 4–6)", sku: "TNX-J003-21", inStock: true },
      { id: "v2", label: "23 inch (ages 6–8)", sku: "TNX-J003-23", inStock: true },
    ],
    rating: 4.9,
    reviewCount: 89,
    vendorRef: "Hangzhou Pailang Sports",
    inStock: true,
    hashtags: ["#gift", "#starter-kit", "#kids"],
  },

  // ---------- STRINGS ----------
  {
    id: "tnx-s-001",
    slug: "spin-poly-125-reel",
    name: "Tennex Spin Poly 1.25 — 200m reel",
    shortName: "Spin Poly reel",
    category: "strings",
    tags: ["intermediate", "best-seller"],
    price: 49,
    compareAt: 130,
    cost: 27,
    description:
      "Black polyester reel, 1.25mm. The workhorse string for restringers and pros. Restrings 15–20 racquets.",
    details: [
      "Polyester monofilament, 1.25mm gauge",
      "200m reel — 15–20 restrings",
      "Recommended tension 50–58 lbs",
      "Color: black",
    ],
    images: [img("poly-reel-a"), img("poly-reel-b")],
    rating: 4.7,
    reviewCount: 67,
    vendorRef: "KELIST (Jiangsu Libo)",
    inStock: true,
    hashtags: ["#poly", "#200m-reel", "#restring"],
  },
  {
    id: "tnx-s-002",
    slug: "comfort-multi-200m",
    name: "Tennex Comfort Multi — 200m reel",
    shortName: "Comfort Multi",
    category: "strings",
    tags: ["beginner-friendly", "intermediate"],
    price: 38,
    compareAt: 99,
    cost: 22,
    description:
      "Soft multifilament for arms that don't love poly. Great control, less shock.",
    details: [
      "Multifilament nylon, 1.25mm gauge",
      "200m reel",
      "Recommended tension 52–60 lbs",
      "Color: natural",
    ],
    images: [img("multi-reel-a")],
    rating: 4.6,
    reviewCount: 41,
    vendorRef: "Various (showroom)",
    inStock: true,
    hashtags: ["#multifilament", "#arm-friendly"],
  },

  // ---------- OVERGRIPS ----------
  {
    id: "tnx-o-001",
    slug: "tack-overgrip-3pack",
    name: "Tennex Tack overgrip — 3-pack",
    shortName: "Tack overgrip",
    category: "overgrips",
    tags: ["under-30", "best-seller", "high-margin"],
    price: 9,
    compareAt: 24,
    cost: 0.9,
    description:
      "Tacky, sweat-absorbent overgrips. Replace every 5–10 sessions. Comes in a 3-pack so you always have one ready.",
    details: [
      "PU tacky material, 0.6mm",
      "3 grips per pack, mixed colors",
      "Anti-slip surface, sweat-absorbent",
      "Fits standard racquet handle",
    ],
    images: [img("overgrip-3pack-a"), img("overgrip-3pack-b")],
    variants: [
      { id: "v1", label: "Mixed (black/white/blue)", sku: "TNX-O001-MIX", inStock: true },
      { id: "v2", label: "All black", sku: "TNX-O001-BLK", inStock: true },
    ],
    rating: 4.8,
    reviewCount: 542,
    vendorRef: "Yilingrong Sports",
    inStock: true,
    hashtags: ["#tacky", "#3-pack", "#under-10"],
  },
  {
    id: "tnx-o-002",
    slug: "tack-overgrip-6pack",
    name: "Tennex Tack overgrip — 6-pack",
    shortName: "Tack 6-pack",
    category: "overgrips",
    tags: ["under-30", "high-margin"],
    price: 15,
    compareAt: 42,
    cost: 1.6,
    description:
      "Six tacky overgrips at a per-grip price you can't argue with.",
    details: [
      "PU tacky material, 0.6mm",
      "6 grips per pack",
      "Anti-slip surface, sweat-absorbent",
    ],
    images: [img("overgrip-6pack-a")],
    rating: 4.8,
    reviewCount: 287,
    vendorRef: "Caston Sports",
    inStock: true,
    hashtags: ["#tacky", "#6-pack", "#stock-up"],
  },

  // ---------- DAMPENERS ----------
  {
    id: "tnx-d-001",
    slug: "novelty-dampener-pack",
    name: "Tennex novelty dampener — 4-pack",
    shortName: "Novelty dampeners",
    category: "dampeners",
    tags: ["under-30", "high-margin"],
    price: 8,
    compareAt: 22,
    cost: 0.6,
    description:
      "Soft silicone vibration dampeners with personality. 4 shapes per pack.",
    details: [
      "Silicone, 4 shapes per pack",
      "Reduces string vibration",
      "Fits all racquet string patterns",
    ],
    images: [img("dampener-a"), img("dampener-b")],
    rating: 4.5,
    reviewCount: 198,
    vendorRef: "Dongguan Silicone Tech",
    inStock: true,
    hashtags: ["#fun", "#4-pack", "#impulse"],
  },

  // ---------- BAGS ----------
  {
    id: "tnx-b-001",
    slug: "court-backpack",
    name: "Tennex Court backpack",
    shortName: "Court backpack",
    category: "bags",
    tags: ["under-50", "best-seller"],
    price: 39,
    compareAt: 95,
    cost: 14,
    description:
      "One- to two-racquet backpack with a separate shoe compartment. The bag you'll actually use every day.",
    details: [
      "Holds 1–2 racquets",
      "Vented shoe compartment",
      "Padded shoulder straps",
      "Side bottle pockets",
    ],
    images: [img("backpack-a"), img("backpack-b"), img("backpack-c")],
    variants: [
      { id: "v1", label: "Black", sku: "TNX-B001-BLK", inStock: true },
      { id: "v2", label: "Off-white", sku: "TNX-B001-OFF", inStock: true },
      { id: "v3", label: "Forest", sku: "TNX-B001-FOR", inStock: false },
    ],
    rating: 4.7,
    reviewCount: 304,
    vendorRef: "Quanzhou Tianqin Bags",
    inStock: true,
    hashtags: ["#backpack", "#every-day", "#shoe-compartment"],
  },
  {
    id: "tnx-b-002",
    slug: "tour-6-pack-bag",
    name: "Tennex Tour 6-pack bag",
    shortName: "6-pack bag",
    category: "bags",
    tags: ["intermediate", "best-seller"],
    price: 55,
    compareAt: 140,
    cost: 18,
    description:
      "Holds six racquets and a week's worth of gear. Padded racquet sleeve, thermal lining.",
    details: [
      "Holds 6 racquets",
      "Thermal-lined main compartment",
      "Double shoulder straps",
      "Custom embroidery option on request",
    ],
    images: [img("6pack-a"), img("6pack-b")],
    rating: 4.8,
    reviewCount: 142,
    vendorRef: "Cherission (Xiamen)",
    inStock: true,
    hashtags: ["#6-pack", "#thermal", "#tour"],
  },

  // ---------- BALLS ----------
  {
    id: "tnx-bl-001",
    slug: "practice-balls-60pack",
    name: "Tennex practice balls — 60-pack",
    shortName: "Practice 60-pack",
    category: "balls",
    tags: ["under-50", "best-seller"],
    price: 45,
    compareAt: 110,
    cost: 27,
    description:
      "Pressureless training balls in a refillable bucket. Built to outlast pressurized cans.",
    details: [
      "60 pressureless training balls",
      "Felt-covered, retains bounce",
      "Refillable storage bucket",
    ],
    images: [img("balls-60pack-a")],
    rating: 4.6,
    reviewCount: 218,
    vendorRef: "Various (showroom)",
    inStock: true,
    hashtags: ["#training", "#60-pack", "#bucket"],
  },
  {
    id: "tnx-bl-002",
    slug: "kids-stage-balls-12pack",
    name: "Tennex kids stage balls — 12-pack",
    shortName: "Kids stage balls",
    category: "balls",
    tags: ["kids", "under-30"],
    price: 15,
    compareAt: 36,
    cost: 5,
    description:
      "USTA red/orange/green stage balls for junior players. Slower bounce, easier rallies.",
    details: [
      "12 mixed-stage balls",
      "Red, orange, and green",
      "Reduced compression for juniors",
    ],
    images: [img("kids-balls-a")],
    rating: 4.7,
    reviewCount: 134,
    vendorRef: "Various (showroom)",
    inStock: true,
    hashtags: ["#kids", "#stage-balls", "#12-pack"],
  },

  // ---------- ACCESSORIES (apparel) ----------
  {
    id: "tnx-a-001",
    slug: "wristband-headband-set",
    name: "Tennex wristband + headband set",
    shortName: "Band set",
    category: "accessories",
    tags: ["under-30", "high-margin"],
    price: 15,
    compareAt: 38,
    cost: 2.8,
    description:
      "Matched terry-cotton set. Embroidered logo. Pick a color, swing harder.",
    details: [
      "Wristband pair + headband",
      "Terry cotton, embroidered logo",
      "One-size adjustable",
    ],
    images: [img("band-set-a"), img("band-set-b")],
    variants: [
      { id: "v1", label: "Black", sku: "TNX-A001-BLK", inStock: true },
      { id: "v2", label: "Off-white", sku: "TNX-A001-OFF", inStock: true },
      { id: "v3", label: "Orange", sku: "TNX-A001-ORG", inStock: true },
    ],
    rating: 4.7,
    reviewCount: 96,
    vendorRef: "Yiwu Custom Sports Accessory Co.",
    inStock: true,
    hashtags: ["#set", "#3-colors", "#embroidered"],
  },
  {
    id: "tnx-a-002",
    slug: "tennis-visor",
    name: "Tennex tennis visor",
    shortName: "Visor",
    category: "accessories",
    tags: ["under-30"],
    price: 18,
    compareAt: 45,
    cost: 5,
    description:
      "Quick-dry visor with embroidered front. For players who want sun off the face but air on the head.",
    details: [
      "Quick-dry polyester",
      "Adjustable rear strap",
      "Embroidered front logo",
    ],
    images: [img("visor-a")],
    rating: 4.6,
    reviewCount: 58,
    vendorRef: "Yiwu Custom Sports Accessory Co.",
    inStock: true,
    hashtags: ["#visor", "#quick-dry"],
  },

  // ---------- COURT EQUIPMENT ----------
  {
    id: "tnx-c-001",
    slug: "ball-hopper-75",
    name: "Tennex ball hopper — 75 ball",
    shortName: "Hopper 75",
    category: "court",
    tags: ["intermediate", "under-50"],
    price: 45,
    compareAt: 115,
    cost: 20,
    description:
      "Wheeled pickup hopper that holds 75 balls. Doubles as a basket. The coach's friend.",
    details: [
      "75-ball capacity",
      "Wheels for transport",
      "Locking lid",
      "Powder-coated frame",
    ],
    images: [img("hopper-75-a"), img("hopper-75-b")],
    rating: 4.7,
    reviewCount: 87,
    vendorRef: "Yongkang Court Equipment Co.",
    inStock: true,
    hashtags: ["#hopper", "#75-ball", "#wheels"],
  },
  {
    id: "tnx-c-002",
    slug: "agility-cones-12",
    name: "Tennex agility cones — set of 12",
    shortName: "Agility cones",
    category: "court",
    tags: ["under-30"],
    price: 15,
    compareAt: 38,
    cost: 4.5,
    description:
      "Footwork cones for warmups and drills. Comes with a carry bag.",
    details: [
      "12 PE cones in carry bag",
      "Stackable",
      "Multi-color",
    ],
    images: [img("cones-a")],
    rating: 4.5,
    reviewCount: 72,
    vendorRef: "Various (showroom)",
    inStock: true,
    hashtags: ["#agility", "#12-pack", "#footwork"],
  },

  // ---------- BALL MACHINES ----------
  {
    id: "tnx-m-001",
    slug: "rally-machine-entry",
    name: "Tennex Rally machine — entry",
    shortName: "Rally machine",
    category: "machines",
    tags: ["intermediate", "new"],
    price: 549,
    compareAt: 1100,
    cost: 290,
    description:
      "120-ball capacity, 20–140 km/h, manual control. The cheapest credible ball machine you can buy.",
    details: [
      "120-ball capacity",
      "Speed 20–140 km/h",
      "Manual oscillation",
      "Foldable handle and wheels",
      "Rechargeable battery, 3-hour runtime",
    ],
    images: [img("machine-entry-a"), img("machine-entry-b"), img("machine-entry-c")],
    rating: 4.4,
    reviewCount: 31,
    vendorRef: "Siboasi (TenniSmash)",
    inStock: true,
    hashtags: ["#ball-machine", "#entry", "#training"],
  },
];

// ---------- Category metadata for nav, breadcrumbs, and Effica-style category cards ----------

export interface CategoryMeta {
  slug: Category;
  name: string;             // sentence case
  shortLabel: string;       // for nav
  number: string;           // "01", "02"... for Effica section headers
  tagline: string;          // one-liner for category card
  hashtags: string[];       // shown on the Effica image card
  heroImage: string;
}

export const categories: CategoryMeta[] = [
  { slug: "racquets", name: "Racquets", shortLabel: "Racquets", number: "01",
    tagline: "Real frames, real prices. No flagship tax.",
    hashtags: ["#aluminum", "#graphite", "#under-100"],
    heroImage: img("cat-racquets", 1200, 800) },
  { slug: "junior", name: "Junior", shortLabel: "Junior", number: "02",
    tagline: "Right-sized racquets for kids 4–12.",
    hashtags: ["#kids", "#size-21", "#size-23", "#size-25"],
    heroImage: img("cat-junior", 1200, 800) },
  { slug: "strings", name: "Strings", shortLabel: "Strings", number: "03",
    tagline: "Reels and sets. Poly, multi, hybrid.",
    hashtags: ["#poly", "#multifilament", "#reels"],
    heroImage: img("cat-strings", 1200, 800) },
  { slug: "overgrips", name: "Overgrips", shortLabel: "Overgrips", number: "04",
    tagline: "The cheapest way to make a racquet feel new again.",
    hashtags: ["#tacky", "#3-pack", "#6-pack"],
    heroImage: img("cat-overgrips", 1200, 800) },
  { slug: "dampeners", name: "Dampeners", shortLabel: "Dampeners", number: "05",
    tagline: "Small, fun, $8.",
    hashtags: ["#impulse", "#fun"],
    heroImage: img("cat-dampeners", 1200, 800) },
  { slug: "bags", name: "Bags", shortLabel: "Bags", number: "06",
    tagline: "Backpacks, 6-packs, 9-packs, 12-packs.",
    hashtags: ["#backpack", "#6-pack", "#12-pack"],
    heroImage: img("cat-bags", 1200, 800) },
  { slug: "balls", name: "Balls", shortLabel: "Balls", number: "07",
    tagline: "Practice buckets, pressurized cans, kid stages.",
    hashtags: ["#training", "#60-pack", "#kids"],
    heroImage: img("cat-balls", 1200, 800) },
  { slug: "accessories", name: "Accessories", shortLabel: "Accessories", number: "08",
    tagline: "Wristbands, headbands, visors.",
    hashtags: ["#set", "#embroidered"],
    heroImage: img("cat-accessories", 1200, 800) },
  { slug: "court", name: "Court equipment", shortLabel: "Court", number: "09",
    tagline: "Hoppers, carts, cones.",
    hashtags: ["#hopper", "#agility"],
    heroImage: img("cat-court", 1200, 800) },
  { slug: "machines", name: "Ball machines", shortLabel: "Machines", number: "10",
    tagline: "Train solo. From $549.",
    hashtags: ["#training", "#solo"],
    heroImage: img("cat-machines", 1200, 800) },
];

// ---------- Convenience selectors for the homepage ----------

export const featured = {
  newThisWeek: (): Product[] => products.filter(p => p.tags.includes("new")).slice(0, 8),
  bestSellers: (): Product[] => products.filter(p => p.tags.includes("best-seller")),
  underFifty: (): Product[] => products.filter(p => p.tags.includes("under-50")),
  kidsPicks: (): Product[] => products.filter(p => p.tags.includes("kids")),
  spotlight: (): Product | undefined => products.find(p => p.slug === "rally-100-aluminum"),
};

export const findBySlug = (slug: string): Product | undefined =>
  products.find(p => p.slug === slug);

export const findByCategory = (cat: Category): Product[] =>
  products.filter(p => p.category === cat);
