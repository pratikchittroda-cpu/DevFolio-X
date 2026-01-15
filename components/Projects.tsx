import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { SectionId, Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Neon Nexus',
    description: 'A futuristic dashboard for managing IoT devices in real-time. Features WebSockets, 3D visualization using Three.js, and dark mode UI.',
    tags: ['React', 'TypeScript', 'Three.js', 'WebSockets'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    link: '#',
    github: '#'
  },
  {
    id: '2',
    title: 'Aether Finance',
    description: 'DeFi aggregation platform with AI-driven market predictions. Integrates with multiple blockchain nodes and provides seamless swapping.',
    tags: ['Next.js', 'Solidity', 'Tailwind', 'Recharts'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    link: '#',
    github: '#'
  },
  {
    id: '3',
    title: 'Echo Chat',
    description: 'End-to-end encrypted messaging application with real-time translation powered by Gemini API.',
    tags: ['React Native', 'Firebase', 'Gemini API', 'Node.js'],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    link: '#',
    github: '#'
  }
];

export const Projects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id={SectionId.PROJECTS} className="py-32 px-4 relative z-10 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-display"
          >
            SELECTED <br />
            <span className="text-zinc-600">WORKS</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-right hidden md:block"
          >
            <p className="text-zinc-400">Curated list of technical projects</p>
            <p className="text-zinc-500 text-sm">2023 - 2024</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative h-[450px] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-none"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              </div>

              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-white/10 bg-black/30 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-6 group-hover:text-white transition-colors">{project.description}</p>
                  
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                     <a href={project.github} className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors">
                        <Github size={18} /> Code
                     </a>
                     <a href={project.link} className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors">
                        <ExternalLink size={18} /> Live Demo
                     </a>
                  </div>
                </div>
              </div>

              {/* Hover Overlay Reveal */}
               <motion.div
                  className="absolute inset-0 bg-cyan-500/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
               />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
            <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                View All Projects <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </section>
  );
};
