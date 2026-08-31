import React from 'react';
import { Box, Compass, BookOpen, Shield, Heart } from 'lucide-react';
import { Link } from '../../context/RouterContext';
import { TOOLS } from '../../data/tools';
import { GUIDES } from '../../data/guides';

export function Footer() {
  return (
    <footer className="border-t border-[#26372A] bg-[#080D0A] pt-12 pb-8 text-[#A7B5A9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-[#26372A]/70">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" id="footer-logo" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#121C15] border border-[#26372A] text-[#55D66F]">
                <Box className="h-4 w-4" />
              </div>
              <span className="text-xl font-extrabold text-[#F1F7F1]">
                Block<span className="text-[#55D66F]">Tools</span>
              </span>
            </Link>

            <p className="text-sm text-[#A7B5A9] leading-relaxed max-w-sm">
              Smart tools for Minecraft players. Fast, accurate calculators for Nether coordinates, item stacks, build materials, redstone timings, and game time.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#55D66F]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#55D66F] animate-pulse" />
              <span>Production Version 1.0 — Free & Independent</span>
            </div>
          </div>

          {/* Tools Column */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F7F1] flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-[#55D66F]" />
              <span>Minecraft Tools</span>
            </p>
            <ul className="space-y-2 text-sm">
              {TOOLS.map(tool => (
                <li key={tool.id}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    id={`footer-tool-${tool.slug}`}
                    className="hover:text-[#55D66F] transition-colors"
                  >
                    {tool.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/tools"
                  id="footer-all-tools"
                  className="text-xs font-semibold text-[#55D66F] hover:underline inline-flex items-center gap-1"
                >
                  View all tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides Column */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F7F1] flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#55D66F]" />
              <span>Guides & Concepts</span>
            </p>
            <ul className="space-y-2 text-sm">
              {GUIDES.map(guide => (
                <li key={guide.id}>
                  <Link
                    to={`/guides/${guide.slug}`}
                    id={`footer-guide-${guide.slug}`}
                    className="hover:text-[#55D66F] transition-colors line-clamp-1"
                    title={guide.title}
                  >
                    {guide.title.split(' in Minecraft')[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/guides"
                  id="footer-all-guides"
                  className="text-xs font-semibold text-[#55D66F] hover:underline inline-flex items-center gap-1"
                >
                  Read all guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Company Column */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F7F1] flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#55D66F]" />
              <span>Information</span>
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" id="footer-about" className="hover:text-[#55D66F] transition-colors">
                  About BlockTools
                </Link>
              </li>
              <li>
                <Link to="/contact" id="footer-contact" className="hover:text-[#55D66F] transition-colors">
                  Feedback & Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" id="footer-privacy" className="hover:text-[#55D66F] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" id="footer-terms" className="hover:text-[#55D66F] transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="mt-8 flex flex-col gap-4 text-xs text-[#6F8072] md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-1">
            <p className="text-[#A7B5A9] font-medium">
              BlockTools is an independent fan-made project and is not affiliated with, endorsed by, or sponsored by Mojang or Microsoft.
            </p>
            <p>
              Minecraft is a registered trademark of Mojang Synergies AB. All game mechanics, names, and formulas are referenced for analytical, educational, and gaming utility purposes.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono text-[11px]">
            <span>© {new Date().getFullYear()} BlockTools</span>
            <span className="flex items-center gap-1 text-[#A7B5A9]">
              Crafted for players <Heart className="h-3 w-3 text-[#55D66F] inline fill-[#55D66F]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
