import { useState, useEffect, useRef } from 'react';

export function useExperienceScrollResize(totalJobs: number) {
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
        
        // Standard enlargement logic - enlarge when previous section shrinks
        const previousSection = ref.current.previousElementSibling as HTMLElement;
        
        if (previousSection) {
          const prevRect = previousSection.getBoundingClientRect();
          const prevCenter = prevRect.top + prevRect.height / 2;
          
          // Enlarge this section when the previous section's center has passed behind the nav bar
          setIsEnlarged(prevCenter < navBarHeight);
        } else {
          // First section starts enlarged and only shrinks when it goes behind nav bar
          setIsEnlarged(!isShrunken);
        }

        // Custom shrinking logic - only shrink when the last job entry shrinks
        const jobContainer = ref.current.querySelector('.space-y-3');
        if (jobContainer) {
          const allJobSections = Array.from(jobContainer.querySelectorAll('section'));
          const lastJobSection = allJobSections[totalJobs - 1] as HTMLElement;
          
          if (lastJobSection) {
            const lastJobRect = lastJobSection.getBoundingClientRect();
            const lastJobCenter = lastJobRect.top + lastJobRect.height / 2;
            
            // Shrink the entire Experience section only when the last job shrinks
            setIsShrunken(lastJobCenter < navBarHeight);
          } else {
            // Fallback to standard shrinking if jobs not found
            setIsShrunken(elementCenter < navBarHeight);
          }
        } else {
          // Fallback to standard shrinking if container not found
          setIsShrunken(elementCenter < navBarHeight);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalJobs]);

  return { ref, isShrunken, isEnlarged };
}