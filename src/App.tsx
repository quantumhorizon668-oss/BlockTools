import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './components/pages/HomePage';
import { ToolDirectoryPage } from './components/pages/ToolDirectoryPage';
import { ToolDetailPage } from './components/pages/ToolDetailPage';
import { GuidesPage } from './components/pages/GuidesPage';
import { GuideDetailPage } from './components/pages/GuideDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';

function AppContent() {
  const { path } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut to open search modal (Cmd/Ctrl + K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine current page based on router path
  const renderRoute = () => {
    const cleanPath = path.split('?')[0];

    // Home
    if (cleanPath === '/' || cleanPath === '') {
      return <HomePage />;
    }

    // Tools directory
    if (cleanPath === '/tools') {
      return <ToolDirectoryPage />;
    }

    // Tool detail routes
    if (cleanPath.startsWith('/tools/')) {
      const slug = cleanPath.replace('/tools/', '');
      return <ToolDetailPage slug={slug} />;
    }

    // Guides hub
    if (cleanPath === '/guides') {
      return <GuidesPage />;
    }

    // Guide detail routes
    if (cleanPath.startsWith('/guides/')) {
      const slug = cleanPath.replace('/guides/', '');
      return <GuideDetailPage slug={slug} />;
    }

    // Static pages
    if (cleanPath === '/about') {
      return <AboutPage />;
    }

    if (cleanPath === '/contact') {
      return <ContactPage />;
    }

    if (cleanPath === '/privacy') {
      return <LegalPage type="privacy" />;
    }

    if (cleanPath === '/terms') {
      return <LegalPage type="terms" />;
    }

    // 404 Fallback
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <span className="text-4xl font-black text-[#55D66F]">404</span>
          <h1 className="text-2xl font-bold text-[#F1F7F1] mt-2">Page Not Found</h1>
          <p className="text-sm text-[#A7B5A9] mt-2 mb-6">
            The page you are looking for does not exist in our dimension.
          </p>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="inline-flex items-center rounded-xl bg-[#55D66F] px-5 py-2.5 text-xs font-bold text-[#080D0A]"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#080D0A] text-[#F1F7F1] font-sans antialiased selection:bg-[#55D66F] selection:text-[#080D0A]">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      
      <main className="flex-1">
        {renderRoute()}
      </main>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
