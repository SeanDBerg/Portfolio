import { useState, useEffect, useRef } from 'react';

export function useScrollShrink() {
  const [isPassed, setIsPassed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementHeight = rect.height;
        const elementTop = rect.top;
        const elementMidpoint = elementTop + (elementHeight / 2);
        
        // Section is "passed" when its midpoint goes above the viewport
        setIsPassed(elementMidpoint < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isPassed };
}