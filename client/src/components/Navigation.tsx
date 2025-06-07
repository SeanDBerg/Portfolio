import { useState, useEffect } from 'react';
import { ResumeRole } from '@/hooks/useResumeRole';

interface NavigationProps {
  currentRole: ResumeRole;
  onRoleChange: (role: ResumeRole) => void;
  onDownloadPDF: () => void;
}

export default function Navigation({ currentRole, onRoleChange, onDownloadPDF }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const roles: Array<{ key: ResumeRole; label: string }> = [
    { key: 'general', label: 'General Manager' },
    { key: 'frontend', label: 'Frontend Developer' },
    { key: 'it', label: 'IT Manager' },
    { key: 'pm', label: 'Project Manager' }
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-subtle shadow-sm no-print transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className={`max-w-6xl mx-auto px-6 transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className={`font-semibold text-navy transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>Sean Berg Resume</div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {roles.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onRoleChange(key)}
                className={`rounded-lg font-medium transition-all duration-300 ${
                  isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'
                } ${
                  currentRole === key
                    ? 'bg-navy text-white shadow-lg'
                    : 'bg-subtle text-gray-700 hover:bg-trust-blue hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          <button
            onClick={onDownloadPDF}
            className={`bg-hover-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg flex items-center gap-2 ${
              isScrolled ? 'px-4 py-1 text-sm' : 'px-6 py-2'
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
