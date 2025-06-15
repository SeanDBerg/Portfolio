import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

interface NavigationProps {
  onDownloadPDF: () => void;
}

export default function Navigation({ onDownloadPDF }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = location === path || (path === '/summary' && location === '/');
    return `font-medium transition-colors ${isScrolled ? 'text-sm' : 'text-base'} ${
      isActive ? 'text-hover-blue' : 'text-navy hover:text-hover-blue'
    }`;
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-subtle shadow-sm no-print transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300 ${isScrolled ? 'scale-98' : 'scale-100'}`}>
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <nav className="flex gap-6">
            <Link href="/summary" className={getLinkClass('/summary')}>
              Summary
            </Link>
            <Link href="/resume" className={getLinkClass('/resume')}>
              Resume
            </Link>
            <Link href="/projects" className={getLinkClass('/projects')}>
              Projects
            </Link>
          </nav>
          
          <button
            onClick={onDownloadPDF}
            className={`bg-hover-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg flex items-center gap-2 flex-shrink-0 ${
              isScrolled 
                ? 'px-3 py-1.5 text-sm' 
                : 'px-4 py-2 text-base'
            }`}
          >
            <i className="fas fa-download"></i>
            Download PDF
          </button>
        </div>
      </div>
    </nav>
  );
}
