import { useState, useEffect, useRef } from 'react';

export function useProjectScrollResize(projectIndex: number, totalProjects: number) {
  const [isShrunken, setIsShrunken] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        // Account for navigation bar height
        const navBarHeight = 80;
        
        // Section should shrink when its center has passed completely behind the navigation bar
        setIsShrunken(elementCenter < navBarHeight);
        
        // For project cards, find the previous project by looking at all project cards
        const parentContainer = ref.current.closest('.grid');
        if (parentContainer && projectIndex > 0) {
          const allProjectCards = Array.from(parentContainer.querySelectorAll('.project-card'));
          const previousProjectCard = allProjectCards[projectIndex - 1] as HTMLElement;
          
          if (previousProjectCard) {
            const prevRect = previousProjectCard.getBoundingClientRect();
            const prevCenter = prevRect.top + prevRect.height / 2;
            
            // Enlarge this section when the previous project's center has passed behind the nav bar
            setIsEnlarged(prevCenter < navBarHeight);
          }
        } else if (projectIndex === 0) {
          // First project should not enlarge independently - it follows the parent Portfolio section
          setIsEnlarged(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projectIndex, totalProjects]);

  return { ref, isShrunken, isEnlarged };
}