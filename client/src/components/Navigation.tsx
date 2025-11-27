import { useState, useEffect } from 'react';
import { getVisibleSections } from '@/config/navigation';
import type { NavigationSection } from '@/App';

interface NavigationProps {
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const visibleSections = getVisibleSections();

  useEffect(() => {
    const handleScroll = () => {
      // Simple scroll detection since navigation is now fixed and doesn't affect layout
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getButtonClass = (section: NavigationSection) => {
    const isActive = activeSection === section;
    return `font-medium transition-colors cursor-pointer ${isScrolled ? 'text-sm' : 'text-base'} ${
      isActive ? 'text-berg-green neon-text' : 'text-muted-foreground hover:text-ops-blue'
    }`;
  };

  return (
    <nav className={`bg-black border-b border-white/10 shadow-lg no-print transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300 ${isScrolled ? 'scale-98' : 'scale-100'}`}>
        <div className="flex flex-row items-center justify-between w-full">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('summary')}
            className="flex items-center gap-2 cursor-pointer group"
            aria-label="BergOps Home"
          >
            <img 
              src="/BergLogo.png" 
              alt="BergOps Logo" 
              className={`transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}
            />
          </button>
          
          {/* Navigation Links */}
          <nav className="flex gap-6">
            {visibleSections.map(section => (
              <button 
                key={section.key}
                onClick={() => onNavigate(section.key as NavigationSection)}
                className={getButtonClass(section.key as NavigationSection)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
}
