import React from 'react';
import { BookOpen, Compass, ArrowRight, Clock, CheckCircle, Lightbulb, HelpCircle } from 'lucide-react';
import { GUIDES } from '../../data/guides';
import { TOOLS } from '../../data/tools';
import { Link } from '../../context/RouterContext';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQAccordion } from '../common/FAQAccordion';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { SEOHead } from '../common/SEOHead';

interface GuideDetailPageProps {
  slug: string;
}

export function GuideDetailPage({ slug }: GuideDetailPageProps) {
  const guide = GUIDES.find(g => g.slug === slug);

  if (!guide) {
    return (
      <div className="min-h-screen py-16 text-center">
        <div className="mx-auto max-w-md px-4">
          <h1 className="text-3xl font-bold text-[#F1F7F1]">Guide Not Found</h1>
          <p className="text-sm text-[#A7B5A9] mt-2 mb-6">
            The requested Minecraft guide does not exist or has moved.
          </p>
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 rounded-xl bg-[#55D66F] px-6 py-2.5 text-xs font-bold text-[#080D0A]"
          >
            <span>Browse All Guides</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const relatedTool = TOOLS.find(t => t.slug === guide.relatedToolSlug);
  const otherGuides = GUIDES.filter(g => g.slug !== guide.slug).slice(0, 2);

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonicalUrl={`https://blocktools.app/guides/${guide.slug}`}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Guides', url: '/guides' },
            { label: guide.title.split(' in Minecraft')[0] }
          ]}
        />

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3 text-xs">
            <span className="rounded-md bg-[#121C15] px-2.5 py-1 font-medium text-[#55D66F] border border-[#26372A]">
              {guide.category} Guide
            </span>
            <span className="flex items-center gap-1 text-[#6F8072] font-mono">
              <Clock className="h-3 w-3" />
              {guide.readTime}
            </span>
            <span className="text-[#6F8072] font-mono">{guide.publishDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F1F7F1] tracking-tight mb-4 leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-[#A7B5A9] leading-relaxed">
            {guide.subtitle}
          </p>
        </header>

        {/* Related Calculator Highlight Callout */}
        {relatedTool && (
          <div className="mb-10 rounded-2xl border border-[#55D66F]/40 bg-[#121C15] p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0D1510] border border-[#55D66F]/30 text-[#55D66F]">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#55D66F]">
                  Companion Calculator
                </p>
                <p className="text-base font-bold text-[#F1F7F1]">
                  Try the {relatedTool.shortName}
                </p>
                <p className="text-xs text-[#A7B5A9] line-clamp-1">
                  {relatedTool.description}
                </p>
              </div>
            </div>

            <Link
              to={`/tools/${relatedTool.slug}`}
              id={`guide-tool-cta-${relatedTool.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#55D66F] px-5 py-2.5 text-xs font-bold text-[#080D0A] hover:bg-[#9DF0AA] transition-colors shrink-0 shadow"
            >
              <span>Launch Calculator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Key Takeaways Box */}
        <section className="mb-10 rounded-2xl border border-[#26372A] bg-[#0D1510] p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-bold text-[#55D66F] mb-4">
            <Lightbulb className="h-4 w-4" />
            <span>Key Takeaways & Core Concepts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A7B5A9]">
                <CheckCircle className="h-4 w-4 text-[#55D66F] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Article Body Sections */}
        <div className="space-y-8 text-base text-[#A7B5A9] leading-relaxed">
          {guide.sections.map((section, idx) => (
            <section key={idx} className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F1F7F1] mb-4">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-4 text-[#A7B5A9]">
                {section.content}
              </p>

              {section.subsections && (
                <div className="space-y-3 pt-2">
                  {section.subsections.map((sub, sIdx) => (
                    <div key={sIdx} className="rounded-xl border border-[#26372A] bg-[#0D1510] p-4">
                      <h3 className="text-sm font-bold text-[#9DF0AA] mb-2">{sub.title}</h3>
                      <pre className="text-xs font-mono text-[#F1F7F1] whitespace-pre-wrap leading-relaxed">
                        {sub.text}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Mid-Article Ad */}
        <AdPlaceholder slot="content-banner" />

        {/* Guide FAQ */}
        <FAQAccordion faqs={guide.faqs} title="Frequently Asked Questions" className="my-10" />

        {/* Other Guides Internal Linking */}
        {otherGuides.length > 0 && (
          <section className="my-12 border-t border-[#26372A] pt-8">
            <h2 className="text-xl font-bold text-[#F1F7F1] mb-6">
              More Minecraft Knowledge Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherGuides.map(og => (
                <Link
                  key={og.id}
                  to={`/guides/${og.slug}`}
                  className="group rounded-xl border border-[#26372A] bg-[#121C15] p-5 hover:border-[#55D66F]/40 transition-colors"
                >
                  <span className="text-[10px] font-mono text-[#55D66F]">{og.readTime}</span>
                  <h3 className="text-sm font-bold text-[#F1F7F1] group-hover:text-[#9DF0AA] mt-1 mb-1">
                    {og.title}
                  </h3>
                  <p className="text-xs text-[#A7B5A9] line-clamp-2">
                    {og.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
