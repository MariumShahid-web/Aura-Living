import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, SlidersHorizontal, Eye, ExternalLink, Plus } from 'lucide-react';

interface CatalogScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories = ['All', 'Vessels', 'Lighting', 'Tables', 'Seating', 'Ceramics', 'Textiles'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.origin.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header Title & Intro */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 font-medium">
          <span>Curated Catalogue</span>
          <span aria-hidden="true">·</span>
          <span>Tactile Works</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100">
          Permanent Objects for Quiet Spaces
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Each piece is shaped by independent craftspeople and small European and Japanese ateliers utilizing raw natural materials.
        </p>
      </div>

      {/* Interactive Controls Bar: Category Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        {/* Category Segmented Controls (Functional buttons conforming to §1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search material, craft..."
              className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md px-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-base text-stone-700 dark:text-stone-300">No objects match your search criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100 underline underline-offset-4 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:shadow-sm transition-all"
            >
              {/* Image Container with Fallback */}
              <div className="relative aspect-4/3 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                />

                {/* Quick action buttons overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onQuickView(product)}
                    title="Quick preview"
                    className="p-1.5 bg-stone-900/80 hover:bg-stone-900 text-stone-100 rounded-md backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.origin}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-base font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {product.material}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Footer price & actions */}
                <div className="pt-3 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/80">
                  <span className="font-mono tabular-nums text-sm font-semibold text-stone-900 dark:text-stone-100">
                    ${product.price.toLocaleString()} USD
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1.5 text-xs font-medium text-stone-100 dark:text-stone-900 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 rounded transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
