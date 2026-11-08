import React, { useState, useEffect, useMemo } from 'react';
import { Product, ExtractedImage } from '../types';
import { SAMPLE_HTML_TEMPLATES } from '../data/mockData';
import { 
  Code2, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Copy, 
  Check, 
  Plus, 
  ExternalLink, 
  Maximize2, 
  RefreshCw, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HtmlScreenImporterProps {
  onAddCustomProduct: (product: Product) => void;
  onNavigateToCatalog: () => void;
}

export const HtmlScreenImporter: React.FC<HtmlScreenImporterProps> = ({
  onAddCustomProduct,
  onNavigateToCatalog,
}) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [htmlInput, setHtmlInput] = useState<string>(SAMPLE_HTML_TEMPLATES[0].html);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [addedItemSuccess, setAddedItemSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'hotlinks' | 'code'>('preview');

  // Parser: Extract all <img> tags and their hotlinked attributes
  const extractedImages = useMemo<ExtractedImage[]>(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');
      const imgElements = doc.querySelectorAll('img');
      const images: ExtractedImage[] = [];

      imgElements.forEach((img) => {
        const src = img.getAttribute('src');
        if (src && src.trim()) {
          images.push({
            src: src.trim(),
            alt: img.getAttribute('alt') || 'Hotlinked Design Image',
            width: img.getAttribute('width') || undefined,
            height: img.getAttribute('height') || undefined,
            detectedType: src.startsWith('http') ? 'Remote Hotlink' : 'Local / Asset',
          });
        }
      });

      return images;
    } catch {
      return [];
    }
  }, [htmlInput]);

  const handleCopyUrl = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  const handleInjectIntoCatalog = (img: ExtractedImage, index: number) => {
    const newProduct: Product = {
      id: `imported-${Date.now()}-${index}`,
      name: img.alt && img.alt !== 'Hotlinked Design Image' ? img.alt : `Imported Screen Object ${index + 1}`,
      subtitle: 'Extracted from HTML screen markup',
      category: 'Vessels',
      price: 290 + (index * 60),
      designer: 'Imported Screen Studio',
      origin: 'Studio Hotlink',
      material: 'Imported Visual Asset',
      dimensions: 'Custom Dimensional Scale',
      description: `Discovered and hotlinked from imported HTML markup. Image source: ${img.src}`,
      imageUrl: img.src,
      secondaryImages: [img.src],
      inStock: true,
      featured: true,
    };

    onAddCustomProduct(newProduct);
    setAddedItemSuccess(`Added "${newProduct.name}" to your live collection!`);
    setTimeout(() => setAddedItemSuccess(null), 3000);
  };

  const handleLoadTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    setHtmlInput(SAMPLE_HTML_TEMPLATES[idx].html);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 font-mono">
          <Code2 className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
          <span>HTML Screen & Hotlink Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100">
          Render Screens & Hotlink Images
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Paste any HTML snippet or design markup below. Our engine automatically parses all hotlinked images, renders interactive multi-device screen previews, and lets you inject items directly into your active store catalog.
        </p>
      </div>

      {/* Success Notification Banner */}
      {addedItemSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-4 text-xs text-emerald-800 dark:text-emerald-200 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-medium">{addedItemSuccess}</span>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="px-3 py-1 bg-emerald-700 dark:bg-emerald-600 text-white rounded text-[11px] font-semibold cursor-pointer hover:bg-emerald-800"
          >
            View in Catalog
          </button>
        </div>
      )}

      {/* Template Chooser & Control Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 whitespace-nowrap shrink-0">
            Presets:
          </span>
          {SAMPLE_HTML_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadTemplate(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedTemplateIndex === idx
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedTemplateIndex(-1);
              setHtmlInput('');
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Clear / Blank
          </button>
        </div>

        {/* Studio View Tabs */}
        <div className="flex items-center gap-1 bg-stone-200 dark:bg-stone-800 p-1 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Live Screen
          </button>
          <button
            onClick={() => setActiveTab('hotlinks')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hotlinks'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Extracted Hotlinks</span>
            <span className="font-mono text-[10px] px-1 bg-stone-100 dark:bg-stone-800 rounded">
              {extractedImages.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Raw Markup
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE SCREEN PREVIEW WITH DEVICE FRAME */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          {/* Viewport & Zoom Controls */}
          <div className="flex items-center justify-between gap-4 p-3 bg-stone-100 dark:bg-stone-900 rounded-lg text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-500 dark:text-stone-400 font-medium">Device:</span>
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  viewportMode === 'desktop'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
                title="Desktop (1440px)"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Desktop</span>
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  viewportMode === 'tablet'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
                title="Tablet (768px)"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Tablet</span>
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  viewportMode === 'mobile'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
                title="Mobile (375px)"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Mobile</span>
              </button>
            </div>

            {/* Scale / Zoom */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 dark:text-stone-400">Scale:</span>
              {[75, 100].map((zoom) => (
                <button
                  key={zoom}
                  onClick={() => setZoomLevel(zoom)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                    zoomLevel === zoom
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                  }`}
                >
                  {zoom}%
                </button>
              ))}
            </div>
          </div>

          {/* Device Mockup Canvas */}
          <div className="bg-stone-200 dark:bg-stone-950 p-4 sm:p-8 rounded-2xl flex items-center justify-center min-h-[500px] overflow-auto border border-stone-300 dark:border-stone-800">
            <div
              style={{
                width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                maxWidth: '100%',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
              }}
              className="bg-white dark:bg-stone-900 rounded-xl overflow-hidden shadow-2xl border border-stone-300 dark:border-stone-800 transition-all duration-300"
            >
              {/* Browser/Device Chrome Bar */}
              <div className="bg-stone-100 dark:bg-stone-800 px-4 py-2.5 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-600 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-600 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-600 inline-block" />
                </div>
                <div className="font-mono text-[11px] text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-900 px-4 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                  hotlinked-screen-preview.local
                </div>
                <div className="font-mono text-[10px] text-stone-400">
                  {viewportMode === 'desktop' ? '1440px' : viewportMode === 'tablet' ? '768px' : '375px'}
                </div>
              </div>

              {/* Sandboxed Iframe Preview */}
              <iframe
                title="Imported Screen Preview"
                srcDoc={htmlInput}
                sandbox="allow-same-origin"
                className="w-full min-h-[600px] border-none bg-white block"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXTRACTED HOTLINKED IMAGES GALLERY & INSPECTION */}
      {activeTab === 'hotlinks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Hotlinked Image Assets ({extractedImages.length})
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              All images discovered in your HTML markup with direct hotlink references
            </p>
          </div>

          {extractedImages.length === 0 ? (
            <div className="p-12 text-center bg-stone-100 dark:bg-stone-900 rounded-xl space-y-2">
              <ImageIcon className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-sm text-stone-700 dark:text-stone-300">
                No &lt;img&gt; tags with src attributes were found in the current HTML.
              </p>
              <p className="text-xs text-stone-500">
                Switch to the "Raw Markup" tab and paste HTML containing image tags or pick one of the presets.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {extractedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-stone-950/70 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                      {img.detectedType}
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {img.alt}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 truncate" title={img.src}>
                        {img.src}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <button
                        onClick={() => handleCopyUrl(img.src)}
                        className="px-2.5 py-1.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedUrl === img.src ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedUrl === img.src ? 'Copied' : 'Copy URL'}</span>
                      </button>

                      <button
                        onClick={() => handleInjectIntoCatalog(img, idx)}
                        className="flex-1 px-3 py-1.5 text-xs font-medium bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 rounded transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Catalog</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RAW MARKUP EDITOR */}
      {activeTab === 'code' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Paste or Edit HTML Code:
            </span>
            <span className="text-stone-500 dark:text-stone-400 font-mono">
              {htmlInput.length.toLocaleString()} characters
            </span>
          </div>

          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste your HTML screens code here (e.g., from Webflow, Figma export, or custom markup)..."
            rows={16}
            className="w-full font-mono text-xs p-4 bg-stone-950 text-stone-200 rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-600 leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Changes reflect instantly in the Live Screen and Hotlinks tabs.
            </p>
            <button
              onClick={() => setActiveTab('preview')}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Preview Live Screen →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
