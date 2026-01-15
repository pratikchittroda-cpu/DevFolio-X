import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from './ui/Buttons';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(0,0,0,0),#050505_100%)]" />
      </div>

      {/* Floating Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 right-[10%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 left-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-xs tracking-widest uppercase font-mono">
            Available for hire
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl lg:text-9xl font-bold font-display tracking-tight text-white mb-8 leading-tight"
        >
          FULL STACK <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 glitch-text" data-text="DEVELOPER">
            DEVELOPER
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Building scalable applications with pixel-perfect user experiences. 
          Specializing in React, Node.js, and Generative AI integrations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton onClick={() => scrollTo(SectionId.PROJECTS)}>
            View Work
          </MagneticButton>
          <MagneticButton className="!bg-transparent !text-white border border-white/20 hover:border-white" onClick={() => scrollTo(SectionId.CONTACT)}>
            Contact Me
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.div>
    </section>
  );
};
