import { useState, useEffect, useRef } from 'react';

export function useScrollShrink() {
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        // Account for navigation bar height - when scrolled it's smaller (~60px), when not scrolled it's larger (~80px)
        // Use a safe estimate of 80px to account for the navigation bar overlay
        const navBarHeight = 80;
        
        // Section should shrink when its center has passed completely behind the navigation bar
        setIsScrolled(elementCenter < navBarHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isScrolled };
}