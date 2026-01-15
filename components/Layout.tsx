import React from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from './ui/CustomCursor';
import { ChatWidget } from './ChatWidget';
import { SectionId } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <CustomCursor />
      
      {/* Fixed Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-zinc-950/50 border-b border-white/5"
      >
        <div className="text-xl font-bold font-display tracking-tighter hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => scrollTo(SectionId.HERO)}>
          DEV<span className="text-cyan-500">.</span>FOLIO
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
          <button onClick={() => scrollTo(SectionId.ABOUT)} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollTo(SectionId.PROJECTS)} className="hover:text-white transition-colors">Work</button>
          <button onClick={() => scrollTo(SectionId.CONTACT)} className="hover:text-white transition-colors">Contact</button>
        </div>
        <a 
            href="#" 
            className="text-xs px-4 py-2 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-all"
        >
            Resume.pdf
        </a>
      </motion.nav>

      <main>
        {children}
      </main>

      <footer className="py-8 text-center text-zinc-600 text-xs border-t border-zinc-900 bg-zinc-950">
        <p>&copy; {new Date().getFullYear()} Alex Dev. Built with React & Gemini AI.</p>
      </footer>
      
      <ChatWidget />
    </div>
  );
};
