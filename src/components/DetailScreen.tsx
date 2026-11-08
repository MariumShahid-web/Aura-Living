import React, { useState } from 'react';
import { Product, ScreenType } from '../types';
import { ArrowLeft, Check, Plus, Minus, ShoppingBag, Share2, Compass } from 'lucide-react';

interface DetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl);
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Top Breadcrumb & Return Nav */}
      <div className="flex items-center justify-between gap-4 text-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>

        <div className="flex items-center gap-2 text-stone-400">
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-stone-700 dark:text-stone-300 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main 2-Column Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Visual Showcase & Thumbnails */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-16/10 bg-stone-100 dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.secondaryImages && product.secondaryImages.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[product.imageUrl, ...product.secondaryImages.filter(img => img !== product.imageUrl)].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImage === img
                      ? 'border-stone-900 dark:border-stone-100'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Purchasing Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
            {/* Zero-Pill Metadata */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span>{product.origin}</span>
              <span aria-hidden="true">·</span>
              <span>By {product.designer}</span>
            </div>

            <h1 className="text-3xl font-serif text-stone-900 dark:text-stone-100 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-stone-600 dark:text-stone-400">
              {product.subtitle}
            </p>

            <div className="pt-2 font-mono tabular-nums text-2xl font-semibold text-stone-900 dark:text-stone-100">
              ${product.price.toLocaleString()} USD
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Design & Material Provenance
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Dimensions & Craft
            </h2>
            <div className="text-xs divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800">
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Materials</span>
                <span className="text-stone-900 dark:text-stone-100 font-medium text-right">{product.material}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Dimensions</span>
                <span className="text-stone-900 dark:text-stone-100 font-mono tabular-nums text-right">{product.dimensions}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Atelier Origin</span>
                <span className="text-stone-900 dark:text-stone-100 font-medium text-right">{product.origin}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Availability</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium text-right">In Stock · Ready to Dispatch</span>
              </div>
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-md bg-stone-50 dark:bg-stone-900">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono tabular-nums text-xs font-semibold px-2 min-w-8 text-center text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="px-3 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleAdd}
                className="flex-1 px-6 py-2.5 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ${(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                title="Share link"
                aria-label="Share product"
                className="p-2.5 border border-stone-300 dark:border-stone-700 rounded-md text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Link copied to clipboard.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
