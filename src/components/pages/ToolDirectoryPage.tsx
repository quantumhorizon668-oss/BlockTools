import React, { useState, useMemo } from 'react';
import { Search, Compass, Boxes, Clock, Layers, Sparkles, Filter, X } from 'lucide-react';
import { TOOLS, PLANNED_TOOLS, CATEGORIES } from '../../data/tools';
import { ToolCard } from '../common/ToolCard';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { SEOHead } from '../common/SEOHead';
import { useRouter } from '../../context/RouterContext';

export function ToolDirectoryPage() {
  const { path } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Read URL query category if present
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat) {
        setSelectedCategory(cat);
      }
    }
  }, [path]);

  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.keywords.some(k => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title="Minecraft Tools & Calculators Directory — BlockTools"
        description="Browse all free Minecraft utility calculators: Nether Portal coordinates, Item Stacks, Material crafts, Redstone timings, and in-game day cycles."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Minecraft Tools Directory' }]} />

        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#55D66F]/10 px-3 py-1 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-3">
            <Compass className="h-3.5 w-3.5" />
            Utility Hub Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F1F7F1] tracking-tight mb-3">
            Minecraft Tools
          </h1>
          <p className="text-base sm:text-lg text-[#A7B5A9]">
            Useful calculators and utilities for Minecraft survival, redstone, and building projects.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center justify-between rounded-2xl border border-[#26372A] bg-[#121C15] p-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#55D66F]" />
            <input
              type="text"
              id="directory-search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tools by keyword (portal, stack, time, coordinates)..."
              className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] pl-10 pr-9 py-2.5 text-sm text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A7B5A9] hover:text-[#F1F7F1]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
              <button
                key={cat}
                type="button"
                id={`cat-filter-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#55D66F] text-[#080D0A] shadow'
                    : 'bg-[#0D1510] text-[#A7B5A9] border border-[#26372A] hover:text-[#F1F7F1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tool Cards Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} featured={tool.isPopular} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-12 text-center my-8">
            <p className="text-lg font-bold text-[#F1F7F1]">No tools matched "{searchQuery}"</p>
            <p className="text-sm text-[#A7B5A9] mt-1">
              Try searching for terms like "portal", "stacks", "crafting", "time", or clear category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 rounded-xl bg-[#55D66F] px-4 py-2 text-xs font-bold text-[#080D0A]"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Ad Placement */}
        <AdPlaceholder slot="content-banner" />

        {/* Upcoming Tools Roadmap Section */}
        <div className="mt-12 rounded-2xl border border-[#26372A] bg-[#0D1510]/80 p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#55D66F]">
              Feature Roadmap
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F1F7F1] mt-1">
              Planned & Upcoming Utilities
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B5A9] mt-1">
              The BlockTools architecture is built to seamlessly scale. Here is what is coming in upcoming versions:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLANNED_TOOLS.map(pt => (
              <div
                key={pt.id}
                className="rounded-xl border border-[#26372A]/70 bg-[#121C15]/50 p-4 space-y-2 opacity-80 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F1F7F1]">{pt.name}</span>
                  <span className="rounded bg-[#080D0A] px-2 py-0.5 text-[10px] font-medium text-[#55D66F] border border-[#26372A]">
                    {pt.category}
                  </span>
                </div>
                <p className="text-xs text-[#A7B5A9] leading-relaxed">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
