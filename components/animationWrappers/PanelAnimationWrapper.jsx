import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


export const PanelAnimationWrapper = ({ children, isOpen }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    
    if (isOpen) {
      gsap.fromTo(
        wrapperRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      gsap.to(wrapperRef.current, {
        x: -300,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

export default PanelAnimationWrapper;
