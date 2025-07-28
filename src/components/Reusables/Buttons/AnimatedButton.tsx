"use client";
import { motion, useAnimation, Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedButtonProps {
  className: string;
  handleClick: () => void;
}

const AnimatedButton = ({ className, handleClick }: AnimatedButtonProps) => {
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const variants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const transition: Transition = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsMounted(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      controls.start("animate");
    }
  }, [controls, isMounted]);

  return (
    <motion.button
      type="button"
      ref={buttonRef}
      onClick={handleClick}
      className={className}
      initial="initial"
      animate={controls}
      variants={variants}
      transition={transition}
      whileHover={{ scale: 1.1 }}
    >
      Get Started
    </motion.button>
  );
};

export default AnimatedButton;
