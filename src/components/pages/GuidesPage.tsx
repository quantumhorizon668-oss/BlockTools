import React from 'react';
import { BookOpen, Compass, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { GUIDES } from '../../data/guides';
import { Link } from '../../context/RouterContext';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { SEOHead } from '../common/SEOHead';

export function GuidesPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title="Minecraft Utility & Calculation Guides — BlockTools"
        description="In-depth guides on Nether coordinate math, item stack limits, building material formulas, and Minecraft redstone tick timings."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Guides & Tutorials' }]} />

        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#55D66F]/10 px-3 py-1 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            Practical Minecraft Knowledge
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F1F7F1] tracking-tight mb-3">
            Minecraft Guides
          </h1>
          <p className="text-base sm:text-lg text-[#A7B5A9]">
            Detailed breakdowns of Minecraft formulas, spatial geometry, item grouping, and game mechanics to help you plan smarter builds.
          </p>
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-12">
          {GUIDES.map(guide => (
            <div
              key={guide.id}
              className="group flex flex-col justify-between rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 transition-all hover:border-[#55D66F]/40 hover:bg-[#17241B] hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                  <span className="rounded-md bg-[#0D1510] px-2.5 py-1 font-medium text-[#55D66F] border border-[#26372A]">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#6F8072] font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#F1F7F1] group-hover:text-[#9DF0AA] transition-colors mb-3 leading-snug">
                  {guide.title}
                </h2>

                <p className="text-sm text-[#A7B5A9] leading-relaxed mb-6">
                  {guide.subtitle}
                </p>

                {/* Key Takeaways summary pills */}
                <div className="space-y-2 mb-6 border-t border-[#26372A] pt-4">
                  {guide.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#A7B5A9]">
                      <CheckCircle className="h-3.5 w-3.5 text-[#55D66F] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#26372A] pt-4">
                <Link
                  to={`/guides/${guide.slug}`}
                  id={`guide-card-btn-${guide.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#55D66F] group-hover:text-[#9DF0AA]"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <span className="text-[11px] font-mono text-[#6F8072]">
                  {guide.publishDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Placeholder */}
        <AdPlaceholder slot="content-banner" />
      </div>
    </div>
  );
}
