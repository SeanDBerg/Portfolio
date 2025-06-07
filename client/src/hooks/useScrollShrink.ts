import { useState, useEffect, useRef } from 'react';

export function useScrollShrink(offset: number = 200) {
  const [isPassed, setIsPassed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const scrollPosition = window.scrollY + offset;
        
        setIsPassed(scrollPosition > elementTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { ref, isPassed };
}