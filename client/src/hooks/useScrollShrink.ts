import { useState, useEffect, useRef } from 'react';

export function useScrollShrink() {
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        // Section should shrink when its center has passed completely above the viewport (off screen)
        setIsScrolled(elementCenter < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isScrolled };
}