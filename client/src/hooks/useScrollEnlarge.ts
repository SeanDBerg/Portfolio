import { useState, useEffect, useRef } from 'react';

export function useScrollEnlarge() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementBottom = rect.bottom;
        
        // Section is "in view" when its bottom edge is still visible in the viewport
        // This creates an enlargement effect as sections come into focus
        setIsInView(elementBottom >= 100); // 100px buffer for smooth transition
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isInView };
}