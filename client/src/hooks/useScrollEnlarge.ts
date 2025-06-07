import { useState, useEffect, useRef } from 'react';

export function useScrollEnlarge() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        
        // Section is "in view" when it's visible in the viewport
        // This creates an enlargement effect as sections come into focus
        setIsInView(elementTop < window.innerHeight && elementBottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isInView };
}