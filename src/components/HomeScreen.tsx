import React from 'react';
import { Product, ScreenType } from '../types';
import { ArrowRight, Compass, Code2 } from 'lucide-react';

interface HomeScreenProps {
  products: Product[];
  onNavigate: (screen: ScreenType) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-6">
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 min-h-[560px] flex items-end">
          <img
            src="/src/assets/images/hero_architectural_living_1794150928041.jpg"
            alt="Minimalist architectural living room overlooking pine forest"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-102"
          />
          {/* Measured gradient scrim for 4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

          <div className="relative z-10 p-8 sm:p-14 max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-300 font-medium">
              <span>Architectural Series 2026</span>
              <span aria-hidden="true">·</span>
              <span>Volume IV</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-stone-100 leading-tight" style={{ textWrap: 'balance' }}>
              The quiet dialogue between form, light, and organic permanence.
            </h1>

            <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
              Tactile furniture and handcrafted stoneware designed to settle modern interiors into serene contemplation.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-5 py-2.5 bg-stone-100 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('lookbook')}
                className="px-5 py-2.5 bg-stone-900/60 hover:bg-stone-900/80 text-stone-200 border border-stone-600/70 text-xs font-semibold uppercase tracking-wider rounded-md backdrop-blur-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Tour Spaces</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Highlight Cards */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium mb-1">
              Selected Edition
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-100">
              Architectural Objects
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-medium uppercase tracking-wider text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explore All 6 Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:shadow-sm transition-all"
            >
              {/* Product Visual Container with Fallback */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-4/3 bg-stone-100 dark:bg-stone-800 overflow-hidden cursor-pointer"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  {/* Zero-Pill Metadata */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.origin}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-lg font-medium text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/80">
                  <span className="font-mono tabular-nums text-sm font-semibold text-stone-900 dark:text-stone-100">
                    ${product.price.toLocaleString()} USD
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1.5 text-xs font-medium text-stone-100 dark:text-stone-900 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 rounded transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spatial Spotlight (2-Column Balance) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 font-medium">
                <span>Spatial Case Study</span>
                <span aria-hidden="true">·</span>
                <span>Zurichberg Studio</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100 leading-tight">
                Designing for acoustic depth and tactile warmth.
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                By integrating raw walnut shelving, cast terrazzo floors, and natural vegetable-tanned leather seating, the library atrium balances daylight exposure with quiet sensory comfort.
              </p>
              <div className="pt-2 text-xs text-stone-600 dark:text-stone-400 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100 font-semibold">120 m²</span>
                  <span>Open-plan library & reading atrium</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100 font-semibold">100%</span>
                  <span>FSC-certified European walnut and oiled oak</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('lookbook')}
                className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore Interactive Spaces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-xl overflow-hidden min-h-[320px] lg:min-h-[440px]">
            <img
              src="/src/assets/images/curated_reading_lounge_1794150929386.jpg"
              alt="Architectural library lounge interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* HTML Screen Importer Feature Invite */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-mono">
              <Code2 className="w-4 h-4 text-stone-300" />
              <span>HTML & Screen Hotlink Studio</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              Paste any HTML markup to preview screens & hotlink images.
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Have an HTML snippet, exported layout, or visual screens? Use our real-time parser to extract hotlinked images, preview multi-device viewports, and inject items directly into your active catalog.
            </p>
          </div>

          <button
            onClick={() => onNavigate('importer')}
            className="px-6 py-3 bg-white text-stone-950 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-stone-100 transition-colors cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-2"
          >
            <span>Launch HTML Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
