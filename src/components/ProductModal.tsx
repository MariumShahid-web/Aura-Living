import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Plus, Minus, ArrowRight, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewDetails,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-4 right-4 z-20 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-4/3 sm:aspect-auto sm:h-full bg-stone-100 dark:bg-stone-800">
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.origin}</span>
              </div>

              <h3 className="text-xl font-serif text-stone-900 dark:text-stone-100">
                {product.name}
              </h3>

              <div className="font-mono tabular-nums text-lg font-semibold text-stone-900 dark:text-stone-100">
                ${product.price.toLocaleString()} USD
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {product.description}
              </p>

              <div className="pt-2 text-xs text-stone-500 dark:text-stone-400 space-y-1">
                <p>Material: <span className="text-stone-800 dark:text-stone-200 font-medium">{product.material}</span></p>
                <p>Scale: <span className="text-stone-800 dark:text-stone-200 font-mono">{product.dimensions}</span></p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-md bg-stone-50 dark:bg-stone-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono tabular-nums text-xs font-semibold px-2 min-w-6 text-center text-stone-900 dark:text-stone-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-2 px-4 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {added ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
                className="w-full text-center text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Full Architectural Specifications</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
