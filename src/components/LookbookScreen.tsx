import React, { useState } from 'react';
import { SpaceTour, Product, Hotspot, ScreenType } from '../types';
import { Compass, Plus, ArrowRight, Eye, ShoppingBag } from 'lucide-react';

interface LookbookScreenProps {
  spaces: SpaceTour[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const LookbookScreen: React.FC<LookbookScreenProps> = ({
  spaces,
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate,
}) => {
  const [activeSpaceId, setActiveSpaceId] = useState<string>(spaces[0].id);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const currentSpace = spaces.find((s) => s.id === activeSpaceId) || spaces[0];

  const getProductForHotspot = (hotspot: Hotspot): Product | undefined => {
    return products.find((p) => p.id === hotspot.productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 font-medium">
            <span>Spatial Exploration</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Lookbook</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100">
            Rooms in Dialogue
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
            Click any interactive marker on the architectural photography below to inspect object materials, dimensional scale, and atelier origin in situ.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-lg shrink-0">
          {spaces.map((space) => (
            <button
              key={space.id}
              onClick={() => {
                setActiveSpaceId(space.id);
                setActiveHotspot(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSpaceId === space.id
                  ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {space.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Space Viewport */}
      <div className="space-y-6">
        <div className="relative aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-sm">
          <img
            src={currentSpace.mainImage}
            alt={currentSpace.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Interactive Hotspot Pins */}
          {currentSpace.hotspots.map((hotspot) => {
            const isSelected = activeHotspot?.id === hotspot.id;
            return (
              <div
                key={hotspot.id}
                style={{
                  left: `${hotspot.xPercent}%`,
                  top: `${hotspot.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => setActiveHotspot(isSelected ? null : hotspot)}
                  aria-label={`Inspect ${hotspot.label}`}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-stone-950 ring-4 ring-white/40 scale-110 shadow-lg'
                      : 'bg-stone-950/80 text-white border border-white/50 backdrop-blur-md hover:scale-110 hover:bg-stone-900'
                  }`}
                >
                  <Plus className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
                </button>

                {/* Hotspot Hover / Click Popover Card */}
                {isSelected && (
                  <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-xl shadow-xl z-30 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">
                        Object in situ
                      </div>
                      <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {hotspot.label}
                      </div>
                      <div className="font-mono tabular-nums text-xs text-stone-600 dark:text-stone-300 font-medium">
                        ${hotspot.price.toLocaleString()} USD
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-stone-100 dark:border-stone-800">
                      {getProductForHotspot(hotspot) && (
                        <>
                          <button
                            onClick={() => onSelectProduct(getProductForHotspot(hotspot)!)}
                            className="flex-1 px-2.5 py-1.5 text-[11px] font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 rounded cursor-pointer transition-colors"
                          >
                            View Specs
                          </button>
                          <button
                            onClick={() => onAddToCart(getProductForHotspot(hotspot)!)}
                            className="px-2.5 py-1.5 text-[11px] font-medium bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-950 rounded cursor-pointer transition-colors"
                          >
                            Add
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Location Caption Overlay */}
          <div className="absolute bottom-4 left-4 z-10 bg-stone-950/70 backdrop-blur-md px-3.5 py-2 rounded-lg text-xs text-white border border-white/10 space-y-0.5 pointer-events-none">
            <div className="font-medium">{currentSpace.title}</div>
            <div className="text-[11px] text-stone-300">{currentSpace.location}</div>
          </div>
        </div>

        {/* Space Narrative */}
        <div className="p-6 bg-stone-100 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Architectural Context
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {currentSpace.description}
            </p>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
