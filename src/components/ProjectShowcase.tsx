import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Layers, Building2, Eye } from 'lucide-react';
import { PROJECTS } from '../data';
import { ProjectItem } from '../types';

export default function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Architectural' | 'Structural' | 'MEP' | 'Coordination'>('All');

  const categories: ('All' | 'Architectural' | 'Structural' | 'MEP' | 'Coordination')[] = [
    'All',
    'Architectural',
    'Structural',
    'MEP',
    'Coordination'
  ];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(proj => proj.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-10 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Background blueprint layout overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.06)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Case Studies
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans mb-5">
            Architectural Milestones
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            A selective showcase of complex global projects engineered from conceptual model phases down to precision fabrication delivery.
          </p>
        </div>

        {/* Categories Filtering Bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide border cursor-pointer transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col bg-slate-900/35 border border-slate-800/60 rounded-2xl overflow-hidden hover:border-slate-700/60 hover:bg-slate-900/60 transition-all duration-300 shadow-xl"
              >
                {/* Image and overlay header */}
                <div className="relative h-64 md:h-80 overflow-hidden shrink-0">
                  {/* Subtle technical zoom effect on hover */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark mask overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  {/* Top-right floating technical category tag */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="font-mono text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Title overlay at the bottom of the image */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-1 group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1">
                      <Layers className="w-3.5 h-3.5 text-blue-500" />
                      <span>SPECIFICATION // LEVEL_OF_DETAIL: LOD_400</span>
                    </div>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
                  <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Quantitative Results Metric Box */}
                  <div className="space-y-3 pt-5 border-t border-slate-800/60">
                    <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      VERIFIED AUDIT RESULTS:
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.results.map((res, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-900/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                          <span className="text-slate-300 text-xs font-normal leading-relaxed font-sans">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <div className="pt-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 uppercase tracking-widest">APEX_PORTFOLIO_REFERENCE // {project.id}</span>
                    <span className="text-blue-400 group-hover:text-white font-semibold transition-colors duration-200 flex items-center gap-1">
                      VIEW SCHEMATICS <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
