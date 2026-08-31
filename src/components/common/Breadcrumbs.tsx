import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '../../context/RouterContext';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-[#A7B5A9]">
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <li className="flex items-center">
          <Link
            to="/"
            id="breadcrumb-home"
            className="flex items-center gap-1.5 transition-colors hover:text-[#55D66F]"
            title="BlockTools Home"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-[#26372A]" />
              {item.url && !isLast ? (
                <Link
                  to={item.url}
                  id={`breadcrumb-item-${index}`}
                  className="transition-colors hover:text-[#55D66F]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-[#F1F7F1] line-clamp-1" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
