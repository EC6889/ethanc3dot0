import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = (stagger = false) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px 0px' });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        ...(stagger && { staggerChildren: 0.2 }),
      },
    },
  };

  return {
    ref,
    variants,
    isInView,
  };
};
