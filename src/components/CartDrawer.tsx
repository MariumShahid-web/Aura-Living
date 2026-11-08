import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 45;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'AURA15' || code === 'STUDIO15') {
      setDiscountPercent(15);
      setPromoMessage('15% Studio Collector Discount Applied');
    } else if (code === 'FREESHIP') {
      setDiscountPercent(5);
      setPromoMessage('Promotional Discount Applied');
    } else {
      setPromoMessage('Invalid promotional code');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const generatedOrderNo = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNo);
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 dark:bg-stone-900 shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-800 transition-colors">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Shopping Bag
              </span>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close bag drawer"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-xl font-serif text-stone-900 dark:text-stone-100">
                  Order Confirmed
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
                  Thank you for curating with Aura Living. Your pieces have been allocated for white-glove packaging.
                </p>
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-mono text-stone-800 dark:text-stone-200 max-w-xs mx-auto">
                  Order Ref: <span className="font-semibold">{orderNumber}</span>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setOrderComplete(false);
                      onClose();
                    }}
                    className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <p className="text-sm text-stone-600 dark:text-stone-400">Your shopping bag is empty.</p>
                <button
                  onClick={onClose}
                  className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100 underline underline-offset-4 cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-200 dark:divide-stone-800">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-4 flex gap-4 first:pt-0">
                    <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-hidden shrink-0 border border-stone-200 dark:border-stone-800">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {product.category} · {product.origin}
                        </div>
                        <h4 className="text-xs font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="font-mono tabular-nums text-xs font-semibold text-stone-900 dark:text-stone-100">
                          ${(product.price * quantity).toLocaleString()} USD
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded bg-white dark:bg-stone-800">
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono tabular-nums text-xs px-2 min-w-5 text-center text-stone-900 dark:text-stone-100">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {!orderComplete && items.length > 0 && (
            <div className="p-6 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 space-y-4">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. AURA15)"
                  className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 rounded focus:outline-none uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 text-xs font-medium rounded transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className="text-[11px] text-stone-600 dark:text-stone-400">
                  {promoMessage}
                </p>
              )}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toLocaleString()} USD</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toLocaleString()} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>White-Glove Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shipping === 0 ? 'Complimentary' : `$${shipping} USD`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Estimated Taxes (8%)</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)} USD</span>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isCheckingOut ? (
                  <span>Securing Order Allocation...</span>
                ) : (
                  <>
                    <span>Proceed to Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted Allocation · Worldwide Insured Logistics</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
