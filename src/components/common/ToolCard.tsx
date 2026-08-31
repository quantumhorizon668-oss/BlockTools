import React from 'react';
import { Compass, Boxes, Clock, ArrowRight, Sparkles, Layers, Zap, Circle, Triangle, Package, Users } from 'lucide-react';
import { ToolData } from '../../types';
import { Link } from '../../context/RouterContext';

interface ToolCardProps {
  tool: ToolData;
  featured?: boolean;
  key?: React.Key;
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="h-6 w-6 text-[#55D66F]" />;
      case 'Boxes':
        return <Boxes className="h-6 w-6 text-[#55D66F]" />;
      case 'Clock':
        return <Clock className="h-6 w-6 text-[#55D66F]" />;
      case 'Layers':
        return <Layers className="h-6 w-6 text-[#55D66F]" />;
      case 'Zap':
        return <Zap className="h-6 w-6 text-[#55D66F]" />;
      case 'Circle':
        return <Circle className="h-6 w-6 text-[#55D66F]" />;
      case 'Triangle':
        return <Triangle className="h-6 w-6 text-[#55D66F]" />;
      case 'Package':
        return <Package className="h-6 w-6 text-[#55D66F]" />;
      case 'Users':
        return <Users className="h-6 w-6 text-[#55D66F]" />;
      default:
        return <Boxes className="h-6 w-6 text-[#55D66F]" />;
    }
  };

  const isAvailable = tool.status === 'available';

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
        featured
          ? 'border-[#55D66F]/40 bg-[#121C15] hover:border-[#55D66F] hover:shadow-[0_8px_30px_rgba(85,214,111,0.12)]'
          : 'border-[#26372A] bg-[#121C15] hover:border-[#37523C] hover:bg-[#17241B]/90 hover:shadow-lg'
      } p-6 sm:p-7`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D1510] border border-[#26372A] group-hover:border-[#55D66F]/40 group-hover:bg-[#55D66F]/10 transition-colors">
            {getIcon(tool.iconName)}
          </div>
          
          <div className="flex items-center gap-2">
            {tool.isPopular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#55D66F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#9DF0AA] border border-[#55D66F]/30">
                <Sparkles className="h-3 w-3" />
                Popular
              </span>
            )}
            <span className="rounded-md bg-[#0D1510] px-2.5 py-1 text-xs font-medium text-[#A7B5A9] border border-[#26372A]">
              {tool.category}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#F1F7F1] group-hover:text-[#9DF0AA] transition-colors mb-2">
          {tool.shortName || tool.name}
        </h3>

        <p className="text-sm text-[#A7B5A9] leading-relaxed line-clamp-2 mb-6">
          {tool.description}
        </p>
      </div>

      <div>
        {isAvailable ? (
          <Link
            to={`/tools/${tool.slug}`}
            id={`tool-card-btn-${tool.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1510] px-4 py-2.5 text-sm font-semibold text-[#F1F7F1] border border-[#26372A] transition-all duration-200 group-hover:bg-[#55D66F] group-hover:text-[#080D0A] group-hover:border-[#55D66F] group-hover:shadow-[0_0_15px_rgba(85,214,111,0.3)]"
          >
            <span>Open Tool</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ) : (
          <div className="flex w-full items-center justify-center rounded-xl bg-[#0D1510]/50 px-4 py-2.5 text-xs font-medium text-[#6F8072] border border-[#26372A]/50">
            <span>In Development (Roadmap)</span>
          </div>
        )}
      </div>
    </div>
  );
}
