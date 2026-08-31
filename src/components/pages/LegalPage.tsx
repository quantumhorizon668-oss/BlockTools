import React from 'react';
import { Shield, FileText } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOHead } from '../common/SEOHead';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export function LegalPage({ type }: LegalPageProps) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title={isPrivacy ? 'Privacy Policy — BlockTools' : 'Terms of Service — BlockTools'}
        description={
          isPrivacy
            ? 'BlockTools Privacy Policy: How we handle user privacy, client-side calculations, and cookies.'
            : 'BlockTools Terms of Service: Independent fan-made Minecraft utility guidelines.'
        }
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: isPrivacy ? 'Privacy Policy' : 'Terms of Service' }]} />

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#55D66F]/10 px-3 py-1 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-3">
            {isPrivacy ? <Shield className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F1F7F1] tracking-tight mb-4">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <p className="text-xs font-mono text-[#6F8072]">
            Last updated: August 2026
          </p>
        </div>

        <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 space-y-6 text-sm text-[#A7B5A9] leading-relaxed">
          {isPrivacy ? (
            <>
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">1. Client-Side Calculation Privacy</h2>
                <p>
                  BlockTools executes calculations (such as Nether portal coordinates, item stack totals, recipe craft breakdowns, and game tick timers) directly inside your web browser. We do not store or transmit your entered coordinates or custom recipe values to external servers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">2. Cookies and Local Storage</h2>
                <p>
                  We may utilize local browser storage (`localStorage`) solely to remember user preferences (such as your last selected coordinate system or calculation mode) to improve your browsing experience. No personal tracking data is shared.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">3. Third-Party Services and Advertisements</h2>
                <p>
                  To keep BlockTools free for all Minecraft players, we may display context-appropriate advertisements through third-party ad networks. These providers may use standard anonymized identifiers or cookies according to their respective privacy standards.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">4. Contact</h2>
                <p>
                  For any privacy questions or data inquiries, please reach out via our contact page.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using BlockTools, you agree to these Terms of Service. If you do not agree with any portion of these terms, please do not use our utilities.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">2. Disclaimer of Affiliation</h2>
                <p className="font-semibold text-[#F1F7F1]">
                  BlockTools is an independent fan-made project and is not affiliated with, endorsed by, or sponsored by Mojang or Microsoft. Minecraft is a registered trademark of Mojang Synergies AB.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">3. Accuracy of Calculations</h2>
                <p>
                  While every calculator on BlockTools is built to reflect precise Minecraft gameplay mechanics and mathematics, variations in server mods (e.g., Spigot, Paper, Fabric), custom datapacks, or future game balance updates may cause minor variations. Tools are provided "as is" for gameplay reference.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#F1F7F1]">4. Intellectual Property</h2>
                <p>
                  All custom code, styling, algorithms, and website architecture are copyright BlockTools. Game mechanics and block formulas belong to their respective community or trademark owners.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
