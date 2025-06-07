import { useState, useEffect, useRef } from 'react';

export function useScrollShrinkOnLeave() {
  const [hasLeftView, setHasLeftView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementBottom = rect.bottom;
        
        // Section has "left view" when its bottom edge goes above the viewport
        // This matches the Header's behavior - shrink when scrolled past
        setHasLeftView(elementBottom < 100); // 100px buffer like Header
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, hasLeftView };
}