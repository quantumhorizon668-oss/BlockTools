import React from 'react';
import { Compass, Boxes, Clock, Layers, ArrowRight, Sparkles, Zap, ShieldCheck, Heart, BookOpen, Search } from 'lucide-react';
import { Link } from '../../context/RouterContext';
import { TOOLS, CATEGORIES } from '../../data/tools';
import { GUIDES } from '../../data/guides';
import { ToolCard } from '../common/ToolCard';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { SEOHead } from '../common/SEOHead';

export function HomePage() {
  const popularTools = TOOLS.filter(t => t.isPopular);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="BlockTools — Smart Tools for Minecraft Players"
        description="Fast, simple calculators for Minecraft players — from Nether coordinates and item stacks to resources, game time, and build estimation."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#26372A] bg-block-grid py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        
        {/* Subtle geometric block floating elements */}
        <div className="absolute top-12 left-10 h-16 w-16 rounded-xl border border-[#26372A]/40 bg-[#121C15]/30 rotate-12 pointer-events-none hidden md:block" />
        <div className="absolute bottom-16 right-16 h-24 w-24 rounded-2xl border border-[#26372A]/40 bg-[#121C15]/20 -rotate-6 pointer-events-none hidden md:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#55D66F]/30 bg-[#121C15] px-3.5 py-1.5 text-xs font-bold text-[#55D66F] shadow-[0_0_20px_rgba(85,214,111,0.15)] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#55D66F] animate-ping" />
            <span>FREE MINECRAFT UTILITY TOOLS</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F1F7F1] leading-tight mb-6">
            Play more.<br />
            <span className="text-[#55D66F]">Calculate less.</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#A7B5A9] leading-relaxed mb-8 sm:mb-10">
            Fast, simple tools for Minecraft players — from Nether coordinates and item stacks to resources, time and more.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Link
              to="/tools"
              id="hero-explore-tools-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#55D66F] px-7 py-3.5 text-sm font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] hover:shadow-[0_0_25px_rgba(85,214,111,0.35)] active:scale-95 shadow"
            >
              <span>Explore Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/tools/nether-portal-calculator"
              id="hero-popular-calc-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#26372A] bg-[#121C15] px-6 py-3.5 text-sm font-semibold text-[#F1F7F1] transition-all hover:border-[#55D66F]/50 hover:bg-[#17241B]"
            >
              <Compass className="h-4 w-4 text-[#55D66F]" />
              <span>Popular Calculator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placeholder below hero */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="leaderboard" />
      </div>

      {/* Popular Tools Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#55D66F]">
                Featured Utilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F1F7F1] mt-1">
                Popular Tools
              </h2>
            </div>

            <Link
              to="/tools"
              id="view-all-tools-link"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#55D66F] hover:text-[#9DF0AA] hover:underline"
            >
              <span>View all tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} featured={tool.isPopular} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="border-t border-[#26372A] bg-[#0D1510]/50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#55D66F]">
              Structured Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F1F7F1] mt-1">
              Browse by Category
            </h2>
            <p className="text-sm text-[#A7B5A9] mt-2">
              Find exactly the calculator you need for your current survival or creative task.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/tools?category=${cat.name}`}
                id={`cat-card-${cat.name.toLowerCase()}`}
                className="group rounded-2xl border border-[#26372A] bg-[#121C15] p-5 transition-all hover:border-[#55D66F]/50 hover:bg-[#17241B]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-[#F1F7F1] group-hover:text-[#9DF0AA] transition-colors">
                    {cat.name}
                  </span>
                  <span className="rounded-md bg-[#0D1510] px-2 py-0.5 text-[10px] font-mono text-[#55D66F] border border-[#26372A]">
                    {cat.count} Available
                  </span>
                </div>
                <p className="text-xs text-[#A7B5A9] leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* "Why BlockTools?" Section */}
      <section className="border-t border-[#26372A] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#55D66F]">
              Designed for Players
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F1F7F1] mt-1">
              Why BlockTools?
            </h2>
            <p className="text-sm text-[#A7B5A9] mt-2">
              Built around common calculations Minecraft players actually need, with no clutter or slow page bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1510] border border-[#26372A] text-[#55D66F] mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F1F7F1] mb-2">Fast</h3>
              <p className="text-sm text-[#A7B5A9] leading-relaxed">
                Get answers without digging through complicated pages or laggy interfaces.
              </p>
            </div>

            <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1510] border border-[#26372A] text-[#55D66F] mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F1F7F1] mb-2">Simple</h3>
              <p className="text-sm text-[#A7B5A9] leading-relaxed">
                Tools designed to be understandable at a single glance with clear outputs.
              </p>
            </div>

            <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1510] border border-[#26372A] text-[#55D66F] mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F1F7F1] mb-2">Free</h3>
              <p className="text-sm text-[#A7B5A9] leading-relaxed">
                Core Minecraft utilities available without paywalls or unnecessary friction.
              </p>
            </div>

            <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1510] border border-[#26372A] text-[#55D66F] mb-4">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F1F7F1] mb-2">Useful</h3>
              <p className="text-sm text-[#A7B5A9] leading-relaxed">
                Built around common calculations Minecraft players actually need on survival servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Guides Section */}
      <section className="border-t border-[#26372A] bg-[#0D1510]/60 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#55D66F]">
                Practical Knowledge
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F1F7F1] mt-1">
                Latest Utility Guides
              </h2>
            </div>

            <Link
              to="/guides"
              id="view-all-guides-link"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#55D66F] hover:text-[#9DF0AA] hover:underline"
            >
              <span>Read all guides</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.slice(0, 3).map(guide => (
              <div
                key={guide.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#26372A] bg-[#121C15] p-6 transition-all hover:border-[#37523C] hover:bg-[#17241B]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                    <span className="rounded-md bg-[#0D1510] px-2.5 py-1 font-medium text-[#55D66F] border border-[#26372A]">
                      {guide.category}
                    </span>
                    <span className="text-[#6F8072] font-mono">{guide.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F1F7F1] group-hover:text-[#9DF0AA] transition-colors mb-2">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#A7B5A9] leading-relaxed line-clamp-3 mb-6">
                    {guide.summary}
                  </p>
                </div>

                <Link
                  to={`/guides/${guide.slug}`}
                  id={`home-guide-link-${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55D66F] group-hover:text-[#9DF0AA]"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#26372A] py-16 sm:py-20 bg-block-grid">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl border border-[#26372A] bg-[#121C15] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#55D66F]/10 blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F1F7F1] mb-3">
              Ready to streamline your Minecraft gameplay?
            </h2>
            <p className="text-sm sm:text-base text-[#A7B5A9] max-w-xl mx-auto mb-8">
              Explore our full suite of coordinate converters, item stack planners, crafting calculators, and time converters.
            </p>

            <Link
              to="/tools"
              id="cta-bottom-explore"
              className="inline-flex items-center gap-2 rounded-xl bg-[#55D66F] px-8 py-3.5 text-sm font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] hover:shadow-[0_0_25px_rgba(85,214,111,0.4)] active:scale-95"
            >
              <span>Explore All Minecraft Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
