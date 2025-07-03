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
  // Uses same thresholds as Navigation component for consistent behavior
  useEffect(() => {
    const handleScroll = () => {
      // Get the main content scroll position, matching Navigation component logic
      const mainContent = document.querySelector('main');
      if (mainContent) {
        const rect = mainContent.getBoundingClientRect();
        const scrolled = rect.top < 0; // Same threshold as Navigation component
        const atTop = rect.top >= -10; // Small threshold to detect when back at top
        setIsScrolled(scrolled);
        
        // Auto-collapse when scrolled (matches navigation shrink timing)
        if (scrolled && isExpanded) {
          setIsExpanded(false);
        }
        
        // Auto-expand if scrolled back to top (only for resume/projects sections)
        if (atTop && !isExpanded && (activeSection === 'resume' || activeSection === 'projects')) {
          setIsExpanded(true);
        }
      } else {
        // Fallback matching Navigation component
        const scrolled = window.scrollY > 50;
        const atTop = window.scrollY < 20; // Detect when back at top
        setIsScrolled(scrolled);
        
        if (scrolled && isExpanded) {
          setIsExpanded(false);
        }
        
        // Auto-expand if scrolled back to top (only for resume/projects sections)
        if (atTop && !isExpanded && (activeSection === 'resume' || activeSection === 'projects')) {
          setIsExpanded(true);
        }
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
    <div className={`no-print bg-white/95 backdrop-blur-sm border-b border-subtle shadow-sm transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-2">
          {/* Toggle Button and Current Role */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-navy hover:text-hover-blue font-medium transition-colors"
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
                Current: <span className="font-medium text-navy">{roles.find(r => r.key === currentRole)?.label}</span>
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
                    : "bg-subtle text-gray-700 hover:bg-trust-blue hover:text-white"
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
