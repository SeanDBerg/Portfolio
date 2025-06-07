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
        const viewportHeight = window.innerHeight;
        
        // Section is "passed" when its midpoint reaches the middle of the viewport
        const shouldShrink = elementMidpoint < (viewportHeight / 2);
        setIsPassed(shouldShrink);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isPassed };
}