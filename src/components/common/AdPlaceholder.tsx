import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AdPlaceholderProps {
  slot?: 'leaderboard' | 'content-banner' | 'sidebar';
  className?: string;
}

export function AdPlaceholder({ slot = 'content-banner', className = '' }: AdPlaceholderProps) {
  return (
    <aside
      aria-label="Advertisement area"
      className={`relative my-8 overflow-hidden rounded-xl border border-[#26372A]/80 bg-[#0D1510]/60 p-4 sm:p-5 text-center transition-all ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#26372A]/50 pb-2 mb-3 text-[10px] uppercase tracking-wider font-mono text-[#6F8072]">
        <span>Advertisement</span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-[#55D66F]/70" />
          Clean & Non-Intrusive
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-3 text-xs text-[#A7B5A9]">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block h-2 w-2 rounded-sm bg-[#55D66F]/40" />
          <p className="font-medium text-[#F1F7F1]/90">Support BlockTools Development</p>
        </div>
        <p className="text-[11px] text-[#A7B5A9]/75 max-w-md">
          BlockTools is 100% free and open to all Minecraft players. Ad spaces are reserved for privacy-friendly, non-tracking sponsors.
        </p>
      </div>
    </aside>
  );
}
