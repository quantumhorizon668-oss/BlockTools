import React from 'react';
import { Box, Shield, Heart, Code2, Compass, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOHead } from '../common/SEOHead';
import { Link } from '../../context/RouterContext';

export function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title="About BlockTools — Independent Minecraft Utility Platform"
        description="Learn about BlockTools: a fast, free, fan-made utility website for Minecraft survival players and redstone builders."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About' }]} />

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#55D66F]/10 px-3 py-1 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-3">
            <Box className="h-3.5 w-3.5" />
            Independent Fan Project
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F1F7F1] tracking-tight mb-4">
            About BlockTools
          </h1>
          <p className="text-base sm:text-lg text-[#A7B5A9] leading-relaxed">
            Smart tools for Minecraft players — built to make complex in-game mathematics effortless, accurate, and instant.
          </p>
        </div>

        {/* Official Fan-Made Disclaimer Callout */}
        <section className="mb-10 rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3 text-[#55D66F]">
            <Shield className="h-5 w-5" />
            <h2 className="text-lg sm:text-xl font-bold text-[#F1F7F1]">
              Independent Project Statement
            </h2>
          </div>
          <p className="text-sm text-[#F1F7F1] font-medium leading-relaxed mb-3">
            BlockTools is an independent fan-made project and is not affiliated with, endorsed by, or sponsored by Mojang or Microsoft.
          </p>
          <p className="text-xs text-[#A7B5A9] leading-relaxed">
            Minecraft is a registered trademark of Mojang Synergies AB. All game mechanics, dimensional ratios, tick rates, and block properties referenced across BlockTools are community-documented mechanics designed to assist players in survival, redstone engineering, and build construction.
          </p>
        </section>

        {/* Mission & Purpose */}
        <section className="mb-10 rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F1F7F1]">
            Our Purpose
          </h2>
          <p className="text-sm sm:text-base text-[#A7B5A9] leading-relaxed">
            Every Minecraft player has experienced the friction of pausing gameplay to calculate Nether coordinate divisions, estimate how many stacks of stone are needed for a castle roof, or convert redstone ticks into hopper transfer delays.
          </p>
          <p className="text-sm sm:text-base text-[#A7B5A9] leading-relaxed">
            BlockTools was built to provide a clean, modern, zero-bloat utility hub where every tool loads instantly, works accurately, and respects your time.
          </p>
        </section>

        {/* Core Principles */}
        <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#26372A] bg-[#0D1510] p-6">
            <h3 className="text-base font-bold text-[#55D66F] mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Accurate Game Mathematics
            </h3>
            <p className="text-xs sm:text-sm text-[#A7B5A9] leading-relaxed">
              Every formula (from 8:1 dimensional rounding to 20 TPS tick translation and 6:4 crafting bench batch loss) is verified against current Minecraft game versions.
            </p>
          </div>

          <div className="rounded-2xl border border-[#26372A] bg-[#0D1510] p-6">
            <h3 className="text-base font-bold text-[#55D66F] mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Clean, Modern UX
            </h3>
            <p className="text-xs sm:text-sm text-[#A7B5A9] leading-relaxed">
              No distracting popups, fake reviews, or clickbait walls of text. Just high-contrast, responsive utilities with one-click copy actions.
            </p>
          </div>
        </section>

        {/* Action Link to Tools */}
        <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 text-center">
          <h3 className="text-lg font-bold text-[#F1F7F1] mb-2">Explore the Utilities</h3>
          <p className="text-xs text-[#A7B5A9] mb-4">
            Try the Nether Portal, Stack, Material, or Time calculators right now.
          </p>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-[#55D66F] px-6 py-2.5 text-xs font-bold text-[#080D0A]"
          >
            <span>Go to Tools Directory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
