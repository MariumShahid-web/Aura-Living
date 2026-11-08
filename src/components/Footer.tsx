import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-200 dark:border-stone-800">
          {/* Brand Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-sm font-semibold tracking-widest uppercase text-stone-900 dark:text-stone-100 block">
              Aura Living Studio
            </span>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              Dedicated to tactile honesty, architectural permanence, and the quiet dignity of handcrafted domestic objects.
            </p>
            <div className="pt-2 text-xs text-stone-500 dark:text-stone-400 space-y-1">
              <p>Ateliers: Copenhagen · Kyoto · Zurich</p>
              <p>Inquiries: studio@auraliving.design</p>
            </div>
          </div>

          {/* Nav Directory */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-stone-900 dark:text-stone-100 block">
              Exploration
            </span>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Curated Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Interactive Spaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Architectural Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('importer')}
                  className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
                >
                  HTML Screen Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-stone-900 dark:text-stone-100 block">
              The Seasonal Monograph
            </span>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Receive quarterly essays on material culture, new limited ceramic releases, and architectural surveys.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 rounded focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 placeholder:text-stone-400"
              />
              <button
                type="submit"
                aria-label="Subscribe to monograph"
                className="px-3 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-medium rounded hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? <Check className="w-4 h-4 text-emerald-600" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                Thank you for subscribing to our monograph dispatch.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© 2026 Aura Living Studio. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Material Provenance</span>
            <span aria-hidden="true">·</span>
            <span>Sustainable Logistics</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Spec Sheets</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
