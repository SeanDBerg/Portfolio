import { useState, useEffect } from 'react';
import type { NavigationSection } from '@/App';

interface NavigationProps {
  onDownloadPDF: () => void;
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
}

export default function Navigation({ onDownloadPDF, activeSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getButtonClass = (section: NavigationSection) => {
    const isActive = activeSection === section;
    return `font-medium transition-colors cursor-pointer ${isScrolled ? 'text-sm' : 'text-base'} ${
      isActive ? 'text-hover-blue' : 'text-navy hover:text-hover-blue'
    }`;
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-subtle shadow-sm no-print transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300 ${isScrolled ? 'scale-98' : 'scale-100'}`}>
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <nav className="flex gap-6">
            <button 
              onClick={() => onNavigate('summary')}
              className={getButtonClass('summary')}
            >
              Summary
            </button>
            <button 
              onClick={() => onNavigate('resume')}
              className={getButtonClass('resume')}
            >
              Resume
            </button>
            <button 
              onClick={() => onNavigate('projects')}
              className={getButtonClass('projects')}
            >
              Projects
            </button>
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
            PDF
          </button>
        </div>
      </div>
    </nav>
  );
}
