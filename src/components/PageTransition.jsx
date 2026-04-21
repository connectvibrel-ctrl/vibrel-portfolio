import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Clip-path mask reveal from center
    gsap.fromTo(el,
      { clipPath: 'circle(0% at 50% 40%)', opacity: 0 },
      { clipPath: 'circle(150% at 50% 40%)', opacity: 1, duration: 0.9, ease: 'power3.inOut' }
    );
  }, []);

  return (
    <div ref={ref} style={{ willChange: 'clip-path, opacity' }}>
      {children}
    </div>
  );
};

export default PageTransition;
