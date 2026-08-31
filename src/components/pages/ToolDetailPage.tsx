import React from 'react';
import { Compass, BookOpen, ArrowRight, Lightbulb, AlertTriangle, HelpCircle, Share2, Layers } from 'lucide-react';
import { TOOLS } from '../../data/tools';
import { GUIDES } from '../../data/guides';
import { Link } from '../../context/RouterContext';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQAccordion } from '../common/FAQAccordion';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { SEOHead } from '../common/SEOHead';
import { ToolCard } from '../common/ToolCard';
import { NetherPortalCalculator } from '../tools/NetherPortalCalculator';
import { StackCalculator } from '../tools/StackCalculator';
import { MaterialCalculator } from '../tools/MaterialCalculator';
import { TimeCalculator } from '../tools/TimeCalculator';

interface ToolDetailPageProps {
  slug: string;
}

export function ToolDetailPage({ slug }: ToolDetailPageProps) {
  const tool = TOOLS.find(t => t.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen py-16 text-center">
        <div className="mx-auto max-w-md px-4">
          <h1 className="text-3xl font-bold text-[#F1F7F1]">Tool Not Found</h1>
          <p className="text-sm text-[#A7B5A9] mt-2 mb-6">
            The requested Minecraft tool does not exist or has moved.
          </p>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-[#55D66F] px-6 py-2.5 text-xs font-bold text-[#080D0A]"
          >
            <span>Browse Available Tools</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Find related tools and guides
  const relatedTools = TOOLS.filter(t => tool.relatedToolSlugs.includes(t.slug));
  const relatedGuides = GUIDES.filter(g => tool.relatedGuideSlugs.includes(g.slug));

  const renderCalculator = () => {
    switch (tool.slug) {
      case 'nether-portal-calculator':
        return <NetherPortalCalculator />;
      case 'stack-calculator':
        return <StackCalculator />;
      case 'material-calculator':
        return <MaterialCalculator />;
      case 'time-calculator':
        return <TimeCalculator />;
      default:
        return <div>Calculator in active development.</div>;
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title={tool.metaTitle}
        description={tool.metaDescription}
        canonicalUrl={`https://blocktools.app/tools/${tool.slug}`}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Tools', url: '/tools' },
            { label: tool.shortName }
          ]}
        />

        {/* Header Introduction */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-md bg-[#121C15] px-2.5 py-1 text-xs font-medium text-[#55D66F] border border-[#26372A]">
              {tool.category} Utility
            </span>
            <span className="text-xs text-[#6F8072] font-mono">Minecraft 1.21+ Ready</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F1F7F1] tracking-tight mb-4 leading-tight">
            {tool.name}
          </h1>

          <p className="text-base sm:text-lg text-[#A7B5A9] leading-relaxed max-w-3xl">
            {tool.intro}
          </p>
        </div>

        {/* MAIN CALCULATOR (Top Visual Focus) */}
        <div className="mb-12">
          {renderCalculator()}
        </div>

        {/* Top Content Advertisement Placement */}
        <AdPlaceholder slot="content-banner" />

        {/* How It Works Section */}
        <section className="my-12 rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#55D66F]/10 border border-[#55D66F]/20 text-[#55D66F]">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F7F1]">
              How {tool.shortName} Works
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tool.howItWorks.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-[#26372A] bg-[#0D1510] p-4">
                <p className="text-sm font-bold text-[#F1F7F1] mb-1">{item.step}</p>
                <p className="text-xs sm:text-sm text-[#A7B5A9] leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Examples Section */}
        <section className="my-12 rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F7F1] mb-6">
            Practical Calculation Examples
          </h2>

          <div className="space-y-4">
            {tool.examples.map((ex, idx) => (
              <div key={idx} className="rounded-xl border border-[#26372A] bg-[#0D1510] p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[#55D66F]">{ex.title}</h3>
                  <span className="text-[10px] font-mono text-[#6F8072] uppercase">Example {idx + 1}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mb-2">
                  <p className="text-[#A7B5A9]"><strong className="text-[#F1F7F1]">Input:</strong> {ex.input}</p>
                  <p className="text-[#9DF0AA]"><strong className="text-[#F1F7F1]">Result:</strong> {ex.result}</p>
                </div>
                <p className="text-xs text-[#A7B5A9] leading-relaxed">{ex.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Important Notes & Mechanics */}
        <section className="my-12 rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F7F1]">
              Important Game Notes & Tips
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-[#A7B5A9]">
            {tool.importantNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-[#55D66F]" />
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ Section */}
        <FAQAccordion faqs={tool.faqs} title={`Frequently Asked Questions about ${tool.shortName}`} className="my-12" />

        {/* Bottom Ad Area */}
        <AdPlaceholder slot="content-banner" />

        {/* Related Guides Section */}
        {relatedGuides.length > 0 && (
          <section className="my-12 border-t border-[#26372A] pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F1F7F1] flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#55D66F]" />
                <span>Related Guides & Tutorials</span>
              </h2>
              <Link to="/guides" className="text-xs font-bold text-[#55D66F] hover:underline">
                View all guides →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedGuides.map(guide => (
                <div
                  key={guide.id}
                  className="rounded-2xl border border-[#26372A] bg-[#121C15] p-5 flex flex-col justify-between hover:border-[#37523C] transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#55D66F]">{guide.readTime}</span>
                    <h3 className="text-base font-bold text-[#F1F7F1] mt-1 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#A7B5A9] line-clamp-2 mb-4">
                      {guide.summary}
                    </p>
                  </div>
                  <Link
                    to={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#55D66F] hover:text-[#9DF0AA]"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <section className="my-12 border-t border-[#26372A] pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F1F7F1] flex items-center gap-2">
                <Compass className="h-5 w-5 text-[#55D66F]" />
                <span>Other Minecraft Utilities</span>
              </h2>
              <Link to="/tools" className="text-xs font-bold text-[#55D66F] hover:underline">
                Browse all tools →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedTools.map(relTool => (
                <ToolCard key={relTool.id} tool={relTool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
