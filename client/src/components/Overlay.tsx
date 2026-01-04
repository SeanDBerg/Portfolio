import { useState, useEffect } from "react";
import { ResumeRole } from "@/hooks/useResumeRole";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { NavigationSection } from "@/App";

interface OverlayProps {
  currentRole: ResumeRole;
  onRoleChange: (role: ResumeRole) => void;
  activeSection: NavigationSection;
  onDownloadPDF: () => void;
}

export default function Overlay({ currentRole, onRoleChange, activeSection, onDownloadPDF }: OverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Set default expanded state based on current page
  useEffect(() => {
    const shouldExpand = activeSection === 'resume' || activeSection === 'projects';
    setIsExpanded(shouldExpand);
  }, [activeSection]);

  // Handle scroll to auto-collapse/expand based on scroll position
  // Simple scroll detection since overlay is now fixed and doesn't affect layout
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Update isScrolled for styling (matches Navigation component)
      setIsScrolled(scrollY > 25);
      
      // Auto-collapse when scrolling down
      if (isExpanded && scrollY > 25) {
        setIsExpanded(false);
      }
      
      // Auto-expand when scrolling back to top (only for resume/projects sections)
      if (!isExpanded && scrollY < 10 && (activeSection === 'resume' || activeSection === 'projects')) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded, activeSection]);

  const roles: Array<{ key: ResumeRole; label: string }> = [
    { key: "general", label: "General Manager" },
    { key: "frontend", label: "Frontend Developer" },
    { key: "it", label: "IT Manager" },
    { key: "pm", label: "Project Manager" },
  ];

  return (
    <div className={`no-print transition-all duration-300 ${isScrolled ? 'glassmorphism-aurora shadow-lg' : 'bg-transparent border-b border-transparent shadow-none'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-2">
          {/* Toggle Button and Current Role */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-muted-foreground hover:text-ops-blue font-medium transition-colors"
            >
              <span className="text-sm">View as Role</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {/* Current Role Indicator (when collapsed) - moved to right of chevron */}
            {!isExpanded && (
              <div className="text-sm text-gray-600 ml-2">
                Current: <span className="font-medium text-berg-green neon-text">{roles.find(r => r.key === currentRole)?.label}</span>
              </div>
            )}
          </div>

          {/* Download PDF Button - moved from Navigation */}
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

        {/* Expandable Role Buttons */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-20 pb-3' : 'max-h-0'}`}>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {roles.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onRoleChange(key)}
                className={`rounded-lg px-3 sm:px-4 py-2 font-medium transition-colors text-sm sm:text-base flex-shrink-0 ${
                  currentRole === key
                    ? "bg-navy text-white shadow"
                    : "bg-surface border border-white/10 text-muted-foreground hover:bg-ops-blue/10 hover:text-ops-blue hover:border-ops-blue"
                }`}
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  minWidth: 'fit-content'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
