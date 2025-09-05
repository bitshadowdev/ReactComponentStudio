'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ToastWrapper({ children, id }) {
  const toastRef = useRef(null);

  useEffect(() => {
    const toast = toastRef.current;
    
    // Entrance animation
    gsap.from(toast, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Exit animation
    return () => {
      gsap.to(toast, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    };
  }, []);

  return (
    <div ref={toastRef} id={`toast-${id}`}>
      {children}
    </div>
  );
}
