import { useState, useEffect, useRef } from 'react';

export function useScrollResize() {
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
        
        // Find the previous section element for enlargement logic
        const previousSection = ref.current.previousElementSibling as HTMLElement;
        
        if (previousSection) {
          const prevRect = previousSection.getBoundingClientRect();
          const prevCenter = prevRect.top + prevRect.height / 2;
          
          // Enlarge this section when the previous section's center has passed behind the nav bar
          setIsEnlarged(prevCenter < navBarHeight);
        } else {
          // First section (Header) enlarges when user starts scrolling but hasn't scrolled far
          const scrollY = window.scrollY;
          setIsEnlarged(scrollY > 20 && scrollY < 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isShrunken, isEnlarged };
}