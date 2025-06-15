import { useState, useEffect } from 'react';

interface NavigationProps {
  onDownloadPDF: () => void;
}

export default function Navigation({ onDownloadPDF }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-subtle shadow-sm no-print transition-all duration-300 ${isScrolled ? 'py-2 md:py-1' : 'py-3 md:py-2'}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300 ${isScrolled ? 'scale-95 md:scale-98' : 'scale-100'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className={`font-semibold text-navy transition-all duration-300 ${isScrolled ? 'text-base md:text-sm lg:text-base' : 'text-lg md:text-base lg:text-lg'}`}>
            Sean Berg Resume
          </div>
          
          <button
            onClick={onDownloadPDF}
            className={`bg-hover-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg flex items-center gap-1 ${
              isScrolled 
                ? 'px-3 py-1.5 text-sm md:px-2 md:py-1 md:text-xs lg:px-3 lg:py-1.5 lg:text-sm' 
                : 'px-4 py-2 text-sm md:px-3 md:py-1.5 md:text-sm lg:px-4 lg:py-2 lg:text-base'
            }`}
          >
            <i className="fas fa-download text-xs md:text-xs lg:text-sm"></i>
            <span className="hidden xs:inline">Download PDF</span>
            <span className="xs:hidden">PDF</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
