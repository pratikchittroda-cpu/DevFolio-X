import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

const skills = [
  "React", "TypeScript", "Next.js", "Node.js", "GraphQL", "TailwindCSS",
  "PostgreSQL", "MongoDB", "Docker", "AWS", "Figma", "Three.js", "Gemini API",
  "Python", "Redis", "WebSockets"
];

export const Skills: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-zinc-950 border-y border-zinc-900 relative overflow-hidden">
        {/* Background Marquee Text - subtle */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
            <div className="whitespace-nowrap text-[20vw] font-bold font-display leading-none select-none">
                CREATE BUILD DEPLOY CREATE BUILD DEPLOY
            </div>
        </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-display font-bold mb-6"
            >
                Technical <span className="text-cyan-500">Arsenal</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 leading-relaxed mb-8 text-lg"
            >
                I don't just write code; I architect digital solutions. With a deep understanding of both 
                frontend nuances and backend scalability, I bridge the gap between design and technology.
                My toolkit is constantly evolving, currently focused on <span className="text-white font-semibold">Generative AI</span> integrations.
            </motion.p>
            
            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="flex gap-4"
            >
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h3 className="text-2xl font-bold text-white mb-1">5+</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">Years Exp.</p>
                </div>
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h3 className="text-2xl font-bold text-white mb-1">50+</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">Projects</p>
                </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, type: "spring" }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(6,182,212,0.1)", borderColor: "rgba(6,182,212,0.5)" }}
                className="aspect-square flex items-center justify-center p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 transition-colors cursor-default text-sm md:text-base font-medium text-center shadow-lg"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
