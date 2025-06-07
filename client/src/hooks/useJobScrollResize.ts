import { useState, useEffect, useRef } from 'react';

export function useJobScrollResize(jobIndex: number, totalJobs: number) {
  const [isShrunken, setIsShrunken] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        // Account for navigation bar height
        const navBarHeight = 80;
        
        // Section should shrink when its center has passed completely behind the navigation bar
        setIsShrunken(elementCenter < navBarHeight);
        
        // For job sections, find the previous job section by looking at all job sections
        const parentContainer = ref.current.closest('.space-y-3');
        if (parentContainer && jobIndex > 0) {
          const allJobSections = Array.from(parentContainer.querySelectorAll('section'));
          const previousJobSection = allJobSections[jobIndex - 1] as HTMLElement;
          
          if (previousJobSection) {
            const prevRect = previousJobSection.getBoundingClientRect();
            const prevCenter = prevRect.top + prevRect.height / 2;
            
            // Enlarge this section when the previous job section's center has passed behind the nav bar
            setIsEnlarged(prevCenter < navBarHeight);
          }
        } else if (jobIndex === 0) {
          // First job section: find the previous main section (outside the Experience container)
          const experienceContainer = ref.current.closest('section');
          const previousMainSection = experienceContainer?.previousElementSibling as HTMLElement;
          
          if (previousMainSection) {
            const prevRect = previousMainSection.getBoundingClientRect();
            const prevCenter = prevRect.top + prevRect.height / 2;
            
            // Enlarge first job when the previous main section shrinks
            setIsEnlarged(prevCenter < navBarHeight);
          } else {
            // If no previous section, behave like header
            setIsEnlarged(!isShrunken);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jobIndex, totalJobs]);

  return { ref, isShrunken, isEnlarged };
}