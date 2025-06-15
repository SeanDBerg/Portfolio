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
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-subtle shadow-sm no-print transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300 ${isScrolled ? 'scale-98' : 'scale-100'}`}>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className={`font-semibold text-navy transition-all duration-300 ${isScrolled ? 'text-base' : 'text-lg'}`}>
            Sean Berg Resume
          </div>
          
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
