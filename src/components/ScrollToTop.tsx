import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Function to scroll to top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use instant to avoid conflicts with smooth scrolling
      });
    };

    // Immediate scroll
    scrollToTop();

    // Use requestAnimationFrame to ensure scroll happens after DOM updates
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
      
      // Additional frame to handle any remaining layout shifts
      requestAnimationFrame(() => {
        scrollToTop();
      });
    });

    // Also use setTimeout as a fallback for any async operations
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
