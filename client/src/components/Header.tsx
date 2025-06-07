import { useState, useEffect } from 'react';
import { ResumeData } from '@/data/resumeData';

interface HeaderProps {
  roleData: ResumeData;
  isTransitioning: boolean;
}

export default function Header({ roleData, isTransitioning }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white rounded-xl shadow-lg p-4 mb-4 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'} ${isScrolled ? 'header-shrunk' : 'header-normal'}`}>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" 
            alt="Sean Berg Professional Headshot" 
            className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-subtle"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-navy mb-1">Sean Berg</h1>
          <h2 className="text-base text-trust-blue font-medium mb-2">{roleData.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-3 text-sm">{roleData.summary}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs">
            <a 
              href="mailto:SeanDBerg@gmail.com" 
              className="flex items-center gap-1 hover:text-hover-blue transition-colors"
            >
              <i className="fas fa-envelope"></i>
              SeanDBerg@gmail.com
            </a>
            <a 
              href="https://linkedin.com/in/seanberg" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-hover-blue transition-colors"
            >
              <i className="fab fa-linkedin"></i>
              linkedin.com/in/seanberg
            </a>
            <span className="flex items-center gap-1">
              <i className="fas fa-phone"></i>
              (610) 730-3552
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-map-marker-alt"></i>
              Northampton, PA
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
