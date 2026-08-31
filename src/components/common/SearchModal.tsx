import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Compass, Boxes, Clock, BookOpen, ArrowRight, FileText } from 'lucide-react';
import { TOOLS } from '../../data/tools';
import { GUIDES } from '../../data/guides';
import { useRouter } from '../../context/RouterContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Show top suggestions when query is empty
      return [
        ...TOOLS.map(t => ({
          id: `tool-${t.id}`,
          title: t.name,
          description: t.description,
          url: `/tools/${t.slug}`,
          type: 'Tool' as const,
          category: t.category
        })),
        ...GUIDES.slice(0, 2).map(g => ({
          id: `guide-${g.id}`,
          title: g.title,
          description: g.subtitle,
          url: `/guides/${g.slug}`,
          type: 'Guide' as const,
          category: g.category
        }))
      ];
    }

    const toolResults = TOOLS.filter(
      t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.keywords.some(k => k.toLowerCase().includes(q))
    ).map(t => ({
      id: `tool-${t.id}`,
      title: t.name,
      description: t.description,
      url: `/tools/${t.slug}`,
      type: 'Tool' as const,
      category: t.category
    }));

    const guideResults = GUIDES.filter(
      g =>
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    ).map(g => ({
      id: `guide-${g.id}`,
      title: g.title,
      description: g.subtitle,
      url: `/guides/${g.slug}`,
      type: 'Guide' as const,
      category: g.category
    }));

    const pageResults = [
      {
        id: 'page-tools',
        title: 'All Minecraft Tools Directory',
        description: 'Browse all available Minecraft utilities and converters.',
        url: '/tools',
        type: 'Page' as const,
        category: 'Navigation'
      },
      {
        id: 'page-guides',
        title: 'Minecraft Utility Guides',
        description: 'Articles on Nether linking, storage math, ticks, and builds.',
        url: '/guides',
        type: 'Page' as const,
        category: 'Navigation'
      },
      {
        id: 'page-about',
        title: 'About BlockTools',
        description: 'Independent fan-made utility website for Minecraft.',
        url: '/about',
        type: 'Page' as const,
        category: 'Information'
      }
    ].filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));

    return [...toolResults, ...guideResults, ...pageResults];
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
      } else if (e.key === 'Enter') {
        if (searchResults[selectedIndex]) {
          e.preventDefault();
          navigate(searchResults[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  const getItemIcon = (type: 'Tool' | 'Guide' | 'Page') => {
    switch (type) {
      case 'Tool':
        return <Compass className="h-4 w-4 text-[#55D66F]" />;
      case 'Guide':
        return <BookOpen className="h-4 w-4 text-[#9DF0AA]" />;
      case 'Page':
        return <FileText className="h-4 w-4 text-[#A7B5A9]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-16 sm:pt-24 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#26372A] bg-[#0D1510] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#26372A] px-4 py-3.5 sm:px-6">
          <Search className="h-5 w-5 text-[#55D66F]" />
          <input
            ref={inputRef}
            type="text"
            id="global-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tools, guides, coordinates, stacks, ticks..."
            className="flex-1 bg-transparent text-base text-[#F1F7F1] placeholder-[#6F8072] outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#A7B5A9] hover:text-[#F1F7F1] p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-md border border-[#26372A] bg-[#121C15] px-2 py-0.5 text-xs text-[#A7B5A9]"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 divide-y divide-[#26372A]/40">
          {searchResults.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6F8072]">
                {query ? `Results (${searchResults.length})` : 'Popular Tools & Quick Picks'}
              </div>
              {searchResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    id={`search-item-${index}`}
                    type="button"
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      navigate(item.url);
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-[#121C15] border border-[#55D66F]/30 text-[#F1F7F1]'
                        : 'hover:bg-[#121C15]/50 border border-transparent text-[#A7B5A9]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 pr-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#080D0A] border border-[#26372A]">
                        {getItemIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-[#F1F7F1] truncate">
                            {item.title}
                          </p>
                          <span className="rounded bg-[#080D0A] px-1.5 py-0.5 text-[10px] font-medium text-[#55D66F] border border-[#26372A]">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#A7B5A9] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-opacity ${
                        isSelected ? 'text-[#55D66F] opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-[#F1F7F1]">No tools or guides found</p>
              <p className="text-xs text-[#A7B5A9] mt-1">
                Try searching for "portal", "stacks", "crafting", "time", or "coordinates".
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[#26372A] bg-[#080D0A] px-4 py-2.5 text-[11px] text-[#6F8072]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-[#26372A] bg-[#121C15] px-1.5 py-0.5 text-[10px] text-[#A7B5A9]">↑</kbd>{' '}
              <kbd className="rounded border border-[#26372A] bg-[#121C15] px-1.5 py-0.5 text-[10px] text-[#A7B5A9]">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="rounded border border-[#26372A] bg-[#121C15] px-1.5 py-0.5 text-[10px] text-[#A7B5A9]">↵</kbd> Select
            </span>
          </div>
          <span className="font-mono text-[#55D66F]/80">BlockTools Discovery</span>
        </div>
      </div>
    </div>
  );
}
