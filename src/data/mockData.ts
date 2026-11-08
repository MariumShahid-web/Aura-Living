import { Product, SpaceTour, JournalArticle } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Komorebi Stoneware Vessel',
    subtitle: 'Hand-thrown textured ceramic vase',
    category: 'Vessels',
    price: 340,
    designer: 'Maya Lindqvist',
    origin: 'Gotland, Sweden',
    material: 'Coarse Wild Clay & Ash Glaze',
    dimensions: 'H 32cm × W 24cm × D 22cm',
    description: 'Each Komorebi vessel is hand-thrown using raw Swedish wild clay and wood-fired over 72 hours. The organic asymmetric lip reflects natural erosion patterns found along the Baltic coastline.',
    imageUrl: '/src/assets/images/sculptural_ceramic_vessel_1794150929012.jpg',
    secondaryImages: [
      '/src/assets/images/sculptural_ceramic_vessel_1794150929012.jpg',
      '/src/assets/images/hero_architectural_living_1794150928041.jpg'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'Aethel Brass Disc Pendant',
    subtitle: 'Architectural spun brass luminaire',
    category: 'Lighting',
    price: 880,
    designer: 'Søren Kjaer',
    origin: 'Aarhus, Denmark',
    material: 'Hand-Spun Solid Brass & Opal Glass',
    dimensions: 'Ø 54cm × H 18cm (Drop 220cm)',
    description: 'Milled from a single sheet of heavy-gauge brass, the Aethel Pendant directs a gentle ambient wash of warm 2700K light against ceilings and dining surfaces with zero glare.',
    imageUrl: '/src/assets/images/pendant_brass_lamp_1794150929362.jpg',
    secondaryImages: [
      '/src/assets/images/pendant_brass_lamp_1794150929362.jpg',
      '/src/assets/images/curated_reading_lounge_1794150929386.jpg'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-3',
    name: 'Kyoto Low Travertine Table',
    subtitle: 'Monolithic honed stone coffee plinth',
    category: 'Tables',
    price: 1950,
    designer: 'Kenji Takahashi Studio',
    origin: 'Kyoto, Japan',
    material: 'Unfilled Roman Travertine',
    dimensions: 'L 140cm × W 75cm × H 28cm',
    description: 'Crafted from solid blocks of cross-cut Italian travertine, the Kyoto plinth celebrates natural fissures and tactile sediment striations with low, contemplative architectural proportions.',
    imageUrl: '/src/assets/images/hero_architectural_living_1794150928041.jpg',
    secondaryImages: [
      '/src/assets/images/hero_architectural_living_1794150928041.jpg',
      '/src/assets/images/curated_reading_lounge_1794150929386.jpg'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-4',
    name: 'Nordic Cast Lounge Chair',
    subtitle: 'Sculptural aniline leather & oak recliner',
    category: 'Seating',
    price: 2450,
    designer: 'Elinor Vang',
    origin: 'Oslo, Norway',
    material: 'Oiled Smoked Oak & Vegetable-Tanned Saddle Leather',
    dimensions: 'W 82cm × D 90cm × H 76cm',
    description: 'Designed for quiet contemplation and long reading sessions, the Nordic Cast Chair combines hand-stitched saddle leather that patinates gracefully with balanced ergonomic lumber support.',
    imageUrl: '/src/assets/images/curated_reading_lounge_1794150929386.jpg',
    secondaryImages: [
      '/src/assets/images/curated_reading_lounge_1794150929386.jpg',
      '/src/assets/images/hero_architectural_living_1794150928041.jpg'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-5',
    name: 'Moroccan Woven Raw Wool Rug',
    subtitle: 'Hand-knotted unbleached wool runner',
    category: 'Textiles',
    price: 760,
    designer: 'Atlas Cooperative',
    origin: 'High Atlas, Morocco',
    material: '100% High-Mountain Organic Wool',
    dimensions: 'L 300cm × W 200cm',
    description: 'Woven on traditional vertical looms using dense untreated sheep wool. Provides profound acoustic dampening, tactile thermal comfort, and understated geometric rhythm.',
    imageUrl: '/src/assets/images/hero_architectural_living_1794150928041.jpg',
    secondaryImages: [
      '/src/assets/images/hero_architectural_living_1794150928041.jpg'
    ],
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-6',
    name: 'Sylvan Fluted Ceramic Carafe',
    subtitle: 'Minimalist water vessel & tumbler pair',
    category: 'Ceramics',
    price: 180,
    designer: 'Studio Nendo-Inspired Works',
    origin: 'Mino, Japan',
    material: 'Glazed Porcelain & Matte Basalt Exterior',
    dimensions: 'H 24cm × Ø 9cm (Volume 950ml)',
    description: 'Balanced for one-handed pouring with a dripless rim geometry. Fired with contrasting smooth interior glaze and tactile tactile matte exterior.',
    imageUrl: '/src/assets/images/sculptural_ceramic_vessel_1794150929012.jpg',
    secondaryImages: [
      '/src/assets/images/sculptural_ceramic_vessel_1794150929012.jpg'
    ],
    inStock: true,
    featured: false,
  }
];

export const SPACE_TOURS: SpaceTour[] = [
  {
    id: 'space-1',
    title: 'The Forest Pavilion Pavilion',
    location: 'North Zealand, Denmark',
    description: 'An open-plan modernist pavilion wrapped in triple-glazed frameless glass walls, creating seamless continuity between tactile interior objects and the pine forest canopy.',
    mainImage: '/src/assets/images/hero_architectural_living_1794150928041.jpg',
    hotspots: [
      {
        id: 'hs-1',
        xPercent: 49,
        yPercent: 78,
        productId: 'prod-3',
        label: 'Kyoto Low Travertine Table',
        price: 1950,
      },
      {
        id: 'hs-2',
        xPercent: 46,
        yPercent: 70,
        productId: 'prod-1',
        label: 'Komorebi Stoneware Vessel',
        price: 340,
      },
    ],
  },
  {
    id: 'space-2',
    title: 'The Studio Library & Atrium',
    location: 'Zurichberg, Switzerland',
    description: 'Double-height concrete rotunda with custom acoustic walnut millwork and bespoke reading furniture designed for deep focus and sensory calm.',
    mainImage: '/src/assets/images/curated_reading_lounge_1794150929386.jpg',
    hotspots: [
      {
        id: 'hs-3',
        xPercent: 49,
        yPercent: 68,
        productId: 'prod-4',
        label: 'Nordic Cast Lounge Chair',
        price: 2450,
      },
      {
        id: 'hs-4',
        xPercent: 64,
        yPercent: 78,
        productId: 'prod-4',
        label: 'Matching Leather Ottoman',
        price: 850,
      },
    ],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'The Architecture of Stillness',
    subtitle: 'How intentional negative space restores sensory balance in modern dwellings',
    author: 'Clara Lindemann',
    readTime: '6 min read',
    date: 'October 28, 2026',
    category: 'Architecture',
    heroImage: '/src/assets/images/hero_architectural_living_1794150928041.jpg',
    quote: 'True luxury in our accelerated era is not abundance, but the discipline to leave an entire wall unadorned so morning light can paint it.',
    content: [
      'In a world saturated with ephemeral notifications and visual noise, our domestic architecture must function as an emotional sanctuary. When we reduce objects down to their essential tactile truths, space itself begins to breathe.',
      'We spoke with architects and craftsmen who insist that room acoustics, natural daylight trajectories, and material honesty matter far more than ornamental furnishings. A single travertine table ground the room with geological permanence, anchoring our thoughts.',
      'By composing rooms around a singular focal point rather than competing screens and clusters, the home shifts from an engine of consumption to an altar of contemplative rest.'
    ]
  },
  {
    id: 'art-2',
    title: 'Hand-Turned Clay & Wood Ash Glazes',
    subtitle: 'Field notes from a third-generation kiln in Gotland',
    author: 'Jonas Berg',
    readTime: '4 min read',
    date: 'November 2, 2026',
    category: 'Craftsmanship',
    heroImage: '/src/assets/images/sculptural_ceramic_vessel_1794150929012.jpg',
    quote: 'Fire has its own will. The potter merely proposes the form; the flames determine the voice of the vessel.',
    content: [
      'For seventy-two hours straight, wood must be fed into the Noborigama climbing kiln day and night. The ash from birch and apple wood swirls through the chamber at 1,300 degrees Celsius, naturally glazing each pot with unpredictable earthy gradients.',
      'No two vessels emerge with the same texture. The imperfections—subtle warps, mineral flashings, coarse clay fissures—are not flaws to be corrected, but the exact proof of authentic craftsmanship.'
    ]
  }
];

export const SAMPLE_HTML_TEMPLATES = [
  {
    name: 'Architectural Lookbook & Gallery',
    description: 'Curated architectural portfolio with hotlinked hero visuals and object specs',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; background: #faf8f5; color: #1c1917; }
    .hero { position: relative; padding: 60px 40px; text-align: center; }
    .hero img { width: 100%; max-height: 480px; object-fit: cover; border-radius: 8px; }
    .title { font-size: 32px; font-weight: 300; letter-spacing: -0.5px; margin: 24px 0 8px; }
    .subtitle { color: #78716c; font-size: 15px; margin-bottom: 32px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; padding: 0 40px 60px; }
    .card { background: #ffffff; border: 1px solid #e7e5e4; border-radius: 8px; overflow: hidden; padding: 20px; }
    .card img { width: 100%; height: 260px; object-fit: cover; border-radius: 6px; }
    .card-title { font-size: 18px; margin: 16px 0 4px; font-weight: 500; }
    .card-meta { font-size: 13px; color: #a8a29e; }
  </style>
</head>
<body>
  <div class="hero">
    <img src="/src/assets/images/hero_architectural_living_1794150928041.jpg" alt="Nordic Pavilion Living Room" />
    <h1 class="title">The Quiet Architecture of Living</h1>
    <p class="subtitle">Curated residential spaces and bespoke tactile furniture pieces</p>
  </div>
  <div class="grid">
    <div class="card">
      <img src="/src/assets/images/sculptural_ceramic_vessel_1794150929012.jpg" alt="Komorebi Stoneware Vessel" />
      <div class="card-title">Komorebi Stoneware Vessel</div>
      <div class="card-meta">Hand-thrown coarse wild clay · Gotland</div>
    </div>
    <div class="card">
      <img src="/src/assets/images/pendant_brass_lamp_1794150929362.jpg" alt="Aethel Brass Disc Pendant" />
      <div class="card-title">Aethel Brass Disc Pendant</div>
      <div class="card-meta">Solid spun brass · 2700K Warm Wash</div>
    </div>
  </div>
</body>
</html>`
  },
  {
    name: 'Modern Atelier Product Page',
    description: 'Clean Scandinavian product display with high-resolution imagery and specifications',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, sans-serif; padding: 40px; background: #ffffff; color: #111827; }
    .container { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; }
    .gallery img { width: 100%; border-radius: 12px; margin-bottom: 16px; object-fit: cover; }
    .details { padding-top: 20px; }
    .brand { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; }
    .prod-name { font-size: 28px; margin: 8px 0; font-weight: 600; }
    .price { font-size: 20px; font-weight: 500; margin-bottom: 24px; }
    .btn { display: inline-block; background: #111827; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="gallery">
      <img src="/src/assets/images/curated_reading_lounge_1794150929386.jpg" alt="Nordic Reading Lounge Interior" />
      <img src="/src/assets/images/pendant_brass_lamp_1794150929362.jpg" alt="Pendant Detail" />
    </div>
    <div class="details">
      <div class="brand">AURA ATELIER · DENMARK</div>
      <h1 class="prod-name">Nordic Cast Lounge Recliner</h1>
      <div class="price">$2,450 USD</div>
      <p style="color: #4b5563; line-height: 1.6; font-size: 15px;">
        Hand-crafted in oiled smoked oak with vegetable-tanned saddle leather. Sculpted to promote relaxation and tactile harmony in modern living spaces.
      </p>
      <a href="#order" class="btn">Add to Order</a>
    </div>
  </div>
</body>
</html>`
  }
];
