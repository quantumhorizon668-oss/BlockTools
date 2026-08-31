import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface RouterContextType {
  path: string;
  currentRoute: string;
  params: Record<string, string>;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    if (typeof window !== 'undefined') {
      if (options?.replace) {
        window.history.replaceState(null, '', to);
      } else {
        window.history.pushState(null, '', to);
      }
      setPath(to.split('?')[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { currentRoute, params } = useMemo(() => {
    const cleanPath = path.replace(/\/$/, '') || '/';

    if (cleanPath === '/') {
      return { currentRoute: 'home', params: {} };
    }
    if (cleanPath === '/tools') {
      return { currentRoute: 'tools', params: {} };
    }
    if (cleanPath.startsWith('/tools/')) {
      const slug = cleanPath.replace('/tools/', '');
      return { currentRoute: 'tool-detail', params: { slug } };
    }
    if (cleanPath === '/guides') {
      return { currentRoute: 'guides', params: {} };
    }
    if (cleanPath.startsWith('/guides/')) {
      const slug = cleanPath.replace('/guides/', '');
      return { currentRoute: 'guide-detail', params: { slug } };
    }
    if (cleanPath === '/about') {
      return { currentRoute: 'about', params: {} };
    }
    if (cleanPath === '/contact') {
      return { currentRoute: 'contact', params: {} };
    }
    if (cleanPath === '/privacy') {
      return { currentRoute: 'privacy', params: {} };
    }
    if (cleanPath === '/terms') {
      return { currentRoute: 'terms', params: {} };
    }

    return { currentRoute: '404', params: {} };
  }, [path]);

  return (
    <RouterContext.Provider value={{ path, currentRoute, params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({
  to,
  children,
  className = '',
  id,
  title,
  onClick,
  target,
  rel,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !target && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && to.startsWith('/')) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a
      href={to}
      id={id}
      title={title}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}
