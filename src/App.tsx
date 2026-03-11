/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Download, ChevronDown, Mail, Linkedin, MapPin, GraduationCap, Code, Star } from 'lucide-react';
import resumeData from './data/resume.json';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
      >
        SP
      </motion.div>
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatedBackground />

      {!showSplash && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10"
        >
          {/* Navigation */}
          <nav className="fixed top-0 w-full p-6 flex justify-between items-center backdrop-blur-md bg-slate-950/50 border-b border-white/5 z-40">
            <div className="font-bold text-xl tracking-tighter">SP.</div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#education" className="hover:text-emerald-400 transition-colors">Education</a>
              <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            </div>
          </nav>

          {/* Hero Section */}
          <section id="about" className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-emerald-400 font-mono mb-4 flex items-center gap-2">
                <Code size={18} />
                {resumeData.basics.title.split(' | ')[0]}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
                {resumeData.basics.name}.
                <br />
                <span className="text-slate-500 text-3xl md:text-3xl">Building the future with AI.</span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
                {resumeData.basics.summary}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#education"
                  className="px-6 py-3 bg-white text-slate-950 font-medium rounded-lg hover:bg-emerald-400 transition-colors flex items-center gap-2"
                >
                  View Journey <ChevronDown size={18} />
                </a>
                <a href="/resume.pdf" download>
                <button
                className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm border"
                >
                <Download size={18} />  Resume
                </button>
                </a>
              </div>

              <div className="mt-16 flex flex-wrap gap-6 text-sm text-slate-400 font-mono">
                <a href={`mailto:${resumeData.basics.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={16} /> {resumeData.basics.email}
                </a>
                <a href={`https://${resumeData.basics.links[0].url}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> {resumeData.basics.location}
                </span>
              </div>
            </motion.div>
          </section>

          {/* Education Section */}
          <section id="education" className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-12 flex items-center gap-3 text-white">
                <GraduationCap className="text-emerald-400" /> Education
              </h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                {resumeData.education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(16,185,129,0.2)] z-10">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 transition-colors">
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="text-emerald-400 font-mono text-sm">{edu.dates}</span>
                        <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                      </div>
                      <p className="text-slate-400">{edu.degree}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Skills & Extra Section */}
          <section id="skills" className="py-32 px-6 md:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
                <Star className="text-emerald-400" /> Top Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills[0].items.map((skill, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-slate-800/50 border border-white/10 text-slate-300 font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
                <Code className="text-emerald-400" /> Additional Info
              </h3>
              <div className="space-y-4">
                {resumeData.extra.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/30 border border-white/5 text-slate-400">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5">
            <p>Designed & Built by Shailendra Prajapati. {new Date().getFullYear()}</p>
          </footer>
        </motion.main>
      )}
    </div>
  );
}
