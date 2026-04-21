import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagneticCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // GSAP quickTo for silky-smooth lag-following
    const moveDot  = gsap.quickTo(dot,  'left', { duration: 0.08, ease: 'power3' });
    const moveDotY = gsap.quickTo(dot,  'top',  { duration: 0.08, ease: 'power3' });
    const moveRing = gsap.quickTo(ring, 'left', { duration: 0.28, ease: 'power3' });
    const moveRingY= gsap.quickTo(ring, 'top',  { duration: 0.28, ease: 'power3' });

    const onMove = (e) => {
      moveDot(e.clientX);
      moveDotY(e.clientY);
      moveRing(e.clientX);
      moveRingY(e.clientY);
    };

    const onEnter = () => {
      dot.classList.add('hidden');
      ring.classList.add('hidden');
    };
    const onLeave = () => {
      dot.classList.remove('hidden');
      ring.classList.remove('hidden');
    };

    const onTargetEnter = () => {
      dot.classList.add('expanded');
      ring.classList.add('expanded');
    };
    const onTargetLeave = () => {
      dot.classList.remove('expanded');
      ring.classList.remove('expanded');
    };

    const bindTargets = () => {
      document.querySelectorAll('a, button, .hover-target').forEach((el) => {
        el.addEventListener('mouseenter', onTargetEnter);
        el.addEventListener('mouseleave', onTargetLeave);
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onEnter);
    document.addEventListener('mouseenter', onLeave);

    bindTargets();

    const observer = new MutationObserver(bindTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onEnter);
      document.removeEventListener('mouseenter', onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="mag-cursor-dot"  />
      <div ref={ringRef} className="mag-cursor-ring" />
    </>
  );
};

export default MagneticCursor;
