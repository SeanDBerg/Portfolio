import { useState, useEffect } from "react";
import { ResumeRole } from "@/hooks/useResumeRole";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { NavigationSection } from "@/App";

interface OverlayProps {
  currentRole: ResumeRole;
  onRoleChange: (role: ResumeRole) => void;
  activeSection: NavigationSection;
}

export default function Overlay({ currentRole, onRoleChange, activeSection }: OverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Set default expanded state based on current page
  useEffect(() => {
    const shouldExpand = activeSection === 'resume' || activeSection === 'projects';
    setIsExpanded(shouldExpand);
  }, [activeSection]);

  // Handle scroll to auto-collapse
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      
      if (scrolled && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  const roles: Array<{ key: ResumeRole; label: string }> = [
    { key: "general", label: "General Manager" },
    { key: "frontend", label: "Frontend Developer" },
    { key: "it", label: "IT Manager" },
    { key: "pm", label: "Project Manager" },
  ];

  return (
    <div className={`no-print sticky z-40 bg-white/95 backdrop-blur-sm border-b border-subtle shadow-sm transition-all duration-300 ${isScrolled ? 'top-12' : 'top-16'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-2">
          {/* Toggle Button */}
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

          {/* Current Role Indicator (when collapsed) */}
          {!isExpanded && (
            <div className="text-sm text-gray-600">
              Current: <span className="font-medium text-navy">{roles.find(r => r.key === currentRole)?.label}</span>
            </div>
          )}
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
