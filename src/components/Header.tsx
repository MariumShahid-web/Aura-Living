import React from 'react';
import { ScreenType } from '../types';
import { ShoppingBag, Sun, Moon, Code2, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  onOpenCart: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
        >
          <span className="text-xl font-semibold tracking-widest text-stone-900 dark:text-stone-100 uppercase whitespace-nowrap shrink-0">
            Aura Living
          </span>
        </button>

        {/* Zone 2: 4-5 Clean Nav Links (Single line) */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-stone-600 dark:text-stone-400">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'home'
                ? 'text-stone-950 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 font-semibold'
                : 'hover:text-stone-950 dark:hover:text-stone-200'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'catalog'
                ? 'text-stone-950 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 font-semibold'
                : 'hover:text-stone-950 dark:hover:text-stone-200'
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => onNavigate('lookbook')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'lookbook'
                ? 'text-stone-950 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 font-semibold'
                : 'hover:text-stone-950 dark:hover:text-stone-200'
            }`}
          >
            Spaces
          </button>
          <button
            onClick={() => onNavigate('journal')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'journal'
                ? 'text-stone-950 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 font-semibold'
                : 'hover:text-stone-950 dark:hover:text-stone-200'
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => onNavigate('importer')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentScreen === 'importer'
                ? 'text-stone-950 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 font-semibold'
                : 'hover:text-stone-950 dark:hover:text-stone-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML Studio</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-md transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="px-3.5 py-2 text-xs font-medium text-stone-100 dark:text-stone-900 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 rounded-md transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="tabular-nums font-mono text-[11px] px-1 py-0.2 bg-stone-800 dark:bg-stone-200 rounded">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around px-4 py-2.5 border-t border-stone-200/80 dark:border-stone-800/80 text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 overflow-x-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`px-2 py-1 cursor-pointer whitespace-nowrap ${currentScreen === 'home' ? 'text-stone-950 dark:text-stone-100 font-bold' : ''}`}
        >
          Discover
        </button>
        <button
          onClick={() => onNavigate('catalog')}
          className={`px-2 py-1 cursor-pointer whitespace-nowrap ${currentScreen === 'catalog' ? 'text-stone-950 dark:text-stone-100 font-bold' : ''}`}
        >
          Collection
        </button>
        <button
          onClick={() => onNavigate('lookbook')}
          className={`px-2 py-1 cursor-pointer whitespace-nowrap ${currentScreen === 'lookbook' ? 'text-stone-950 dark:text-stone-100 font-bold' : ''}`}
        >
          Spaces
        </button>
        <button
          onClick={() => onNavigate('journal')}
          className={`px-2 py-1 cursor-pointer whitespace-nowrap ${currentScreen === 'journal' ? 'text-stone-950 dark:text-stone-100 font-bold' : ''}`}
        >
          Journal
        </button>
        <button
          onClick={() => onNavigate('importer')}
          className={`px-2 py-1 cursor-pointer whitespace-nowrap flex items-center gap-1 ${currentScreen === 'importer' ? 'text-stone-950 dark:text-stone-100 font-bold' : ''}`}
        >
          <Code2 className="w-3 h-3" />
          <span>HTML Studio</span>
        </button>
      </div>
    </header>
  );
};
