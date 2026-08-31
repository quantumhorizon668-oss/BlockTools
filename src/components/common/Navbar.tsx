import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Box, Compass, BookOpen, Info, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '../../context/RouterContext';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps = {}) {
  const { path } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOpenSearch = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setIsSearchOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [path]);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Tools', url: '/tools', icon: Compass },
    { label: 'Guides', url: '/guides', icon: BookOpen },
    { label: 'About', url: '/about', icon: Info }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'border-b border-[#26372A] bg-[#080D0A]/90 backdrop-blur-md shadow-lg shadow-black/40'
            : 'border-b border-[#26372A]/50 bg-[#080D0A]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            to="/"
            id="nav-brand-logo"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
            title="BlockTools Home"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#121C15] border border-[#26372A] group-hover:border-[#55D66F]/60 group-hover:bg-[#55D66F]/10 transition-colors shadow-inner">
              <Box className="h-5 w-5 text-[#55D66F] transition-transform duration-300 group-hover:rotate-6" />
              <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#55D66F] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[#F1F7F1] group-hover:text-[#9DF0AA] transition-colors leading-tight">
                Block<span className="text-[#55D66F]">Tools</span>
              </span>
              <span className="text-[10px] font-mono font-medium text-[#A7B5A9] tracking-wider uppercase leading-none hidden sm:inline-block">
                Minecraft Utility Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map(link => {
              const isActive =
                path === link.url || (link.url !== '/' && path.startsWith(link.url));
              return (
                <Link
                  key={link.url}
                  to={link.url}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#121C15] text-[#55D66F] border border-[#26372A]'
                      : 'text-[#A7B5A9] hover:bg-[#0D1510] hover:text-[#F1F7F1]'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger and CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              id="global-search-trigger"
              onClick={handleOpenSearch}
              className="flex items-center gap-2 rounded-xl border border-[#26372A] bg-[#0D1510] px-3 py-2 text-xs font-medium text-[#A7B5A9] hover:border-[#55D66F]/50 hover:text-[#F1F7F1] transition-all cursor-pointer"
              title="Search tools and guides"
            >
              <Search className="h-4 w-4 text-[#55D66F]" />
              <span className="hidden sm:inline-block">Search utilities...</span>
              <kbd className="hidden sm:inline-flex items-center rounded border border-[#26372A] bg-[#121C15] px-1.5 py-0.5 text-[10px] font-mono text-[#6F8072]">
                ⌘K
              </kbd>
            </button>

            <Link
              to="/tools"
              id="nav-explore-tools-btn"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-xl bg-[#55D66F] px-4 py-2 text-xs font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] hover:shadow-[0_0_20px_rgba(85,214,111,0.4)] active:scale-95"
            >
              <span>Explore Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 md:hidden items-center justify-center rounded-xl border border-[#26372A] bg-[#0D1510] text-[#F1F7F1] hover:text-[#55D66F] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#26372A] bg-[#080D0A]/95 px-4 py-4 backdrop-blur-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => {
                const isActive =
                  path === link.url || (link.url !== '/' && path.startsWith(link.url));
                return (
                  <Link
                    key={link.url}
                    to={link.url}
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#121C15] text-[#55D66F] border border-[#26372A]'
                        : 'text-[#A7B5A9] hover:bg-[#0D1510] hover:text-[#F1F7F1]'
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-[#26372A]/60 flex flex-col gap-2">
                <Link
                  to="/tools"
                  id="mobile-all-tools-link"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#55D66F] px-4 py-3 text-sm font-bold text-[#080D0A]"
                >
                  <span>Browse All Minecraft Tools</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
