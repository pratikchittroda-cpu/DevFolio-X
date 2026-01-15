import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchButton } from './ui/Buttons';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 2000);
    };

  return (
    <section id={SectionId.CONTACT} className="py-32 px-4 bg-zinc-950 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Let's <span className="text-cyan-400">Collaborate</span></h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
                Have a project in mind? Looking for a senior engineer to lead your team? 
                Drop me a line or interact with the AI assistant.
            </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 md:p-12 rounded-3xl">
            {status === 'success' ? (
                <div className="h-[300px] flex flex-col items-center justify-center text-center">
                    <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500 text-4xl"
                    >
                        ✓
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                    <p className="text-zinc-400">I'll get back to the signal origin shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Name</label>
                            <input 
                                required
                                type="text" 
                                value={formState.name}
                                onChange={e => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Email</label>
                            <input 
                                required
                                type="email" 
                                value={formState.email}
                                onChange={e => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Message</label>
                        <textarea 
                            required
                            rows={5}
                            value={formState.message}
                            onChange={e => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <GlitchButton type="submit" className="w-full md:w-auto">
                            {status === 'submitting' ? 'Transmitting...' : 'Send Transmission'}
                        </GlitchButton>
                    </div>
                </form>
            )}
        </div>
      </div>
    </section>
  );
};
