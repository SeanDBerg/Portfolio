import { useState, useEffect, useRef } from 'react';

export function useScrollEnlarge() {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        // Account for navigation bar height
        const navBarHeight = 80;
        
        // Find the previous section element
        const previousSection = ref.current.previousElementSibling as HTMLElement;
        
        if (previousSection) {
          const prevRect = previousSection.getBoundingClientRect();
          const prevCenter = prevRect.top + prevRect.height / 2;
          
          // Enlarge this section when the previous section's center has passed behind the nav bar
          // This means the previous section is shrinking, so this one should enlarge
          setIsEnlarged(prevCenter < navBarHeight);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isEnlarged };
}