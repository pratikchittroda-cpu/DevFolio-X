import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
}

export const MagneticButton: React.FC<ButtonProps> = ({ children, className = '', onClick, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`relative px-8 py-3 rounded-full overflow-hidden group bg-white text-black font-semibold tracking-wider hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-shadow duration-300 ${className}`}
      {...props}
    >
      <span className="relative z-10 pointer-events-none mix-blend-difference text-black group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
    </motion.button>
  );
};

export const GlitchButton: React.FC<ButtonProps> = ({ children, className = '', onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-2 font-display font-bold text-white border border-cyan-500/50 bg-cyan-950/10 hover:bg-cyan-500/20 transition-all group overflow-hidden ${className}`}
      {...props}
    >
      <span className="relative z-10 group-hover:animate-pulse">{children}</span>
      <div className="absolute inset-0 bg-cyan-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
    </button>
  );
};
