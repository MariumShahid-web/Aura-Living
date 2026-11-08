import React, { useState } from 'react';
import { JournalArticle, ScreenType } from '../types';
import { ArrowLeft, ArrowRight, Share2, Check } from 'lucide-react';

interface JournalScreenProps {
  articles: JournalArticle[];
  onNavigate: (screen: ScreenType) => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({
  articles,
  onNavigate,
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeArticle = articles.find((a) => a.id === selectedArticleId);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (activeArticle) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <button
          onClick={() => setSelectedArticleId(null)}
          className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal Dispatches</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span>{activeArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activeArticle.date}</span>
            <span aria-hidden="true">·</span>
            <span>{activeArticle.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 dark:text-stone-100 leading-tight" style={{ textWrap: 'balance' }}>
            {activeArticle.title}
          </h1>

          <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed font-light">
            {activeArticle.subtitle}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
            <span className="text-stone-700 dark:text-stone-300 font-medium">By {activeArticle.author}</span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share Dispatch'}</span>
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="aspect-16/9 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <img
            src={activeArticle.heroImage}
            alt={activeArticle.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pull Quote */}
        <div className="py-8 px-6 sm:px-12 bg-stone-100 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800">
          <blockquote className="text-lg sm:text-xl font-serif italic text-stone-900 dark:text-stone-100 text-center leading-relaxed">
            "{activeArticle.quote}"
          </blockquote>
        </div>

        {/* Body Text */}
        <div className="space-y-6 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-light">
          {activeArticle.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-10 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100 hover:underline cursor-pointer"
          >
            ← Return to All Articles
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Explore Featured Works
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Journal Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 font-medium">
          <span>The Atelier Journal</span>
          <span aria-hidden="true">·</span>
          <span>Essays & Surveys</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100">
          Notes on Architecture, Material & Time
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
          Critical essays, kiln dispatches, and studio dialogues on modern spatial design and historical craft traditions.
        </p>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticleId(article.id)}
            className="group cursor-pointer flex flex-col space-y-4"
          >
            <div className="aspect-16/10 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <img
                src={article.heroImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span>{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                {article.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                <span>Read Dispatch</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
