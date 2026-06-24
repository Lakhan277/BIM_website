import { motion } from 'motion/react';
import { Target, Eye, Landmark, Award, Building } from 'lucide-react';
import { COUNTERS } from '../data';

export default function AboutSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.02),transparent)] bg-[size:30px_30px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Corporate Overview
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              A Pioneers in Digital Engineering Technology
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
              Apex BIM Solutions is an award-winning digital transformation agency providing specialized BIM (Building Information Modeling) services worldwide. We support general contractors, designers, developers, and engineers by developing intelligent, parametric virtual simulations that eliminate constructability risks before groundbreaking.
            </p>
          </div>
        </div>

        {/* Section 2: Trust Section / Animated Counters Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 border border-slate-800 py-10 bg-slate-900/50 backdrop-blur-xl px-6 rounded-2xl shadow-2xl">
          {COUNTERS.map((counter, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center space-y-1.5"
            >
              <div className="text-3xl md:text-5xl font-extrabold text-blue-500 font-mono tracking-tight select-none">
                {counter.value}{counter.suffix}
              </div>
              <div className="text-slate-400 text-xs md:text-sm font-medium tracking-wide uppercase font-sans">
                {counter.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 3: Mission, Vision, Overview Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Mission Card */}
          <motion.div
            variants={itemVariants}
            className="p-8 bg-slate-950/50 border border-slate-800/60 rounded-2xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300 h-full flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Target className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-white font-bold text-xl tracking-wide mb-3">Our Mission</h3>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-6">
                To build complex digital construction models that democratize structural coordinates, prevent site errors, and enable architects and engineers to build smarter, sustainable infrastructures.
              </p>
            </div>
            <div className="font-mono text-[9px] text-slate-600 border-t border-slate-900 pt-4">
              FOCUS_TARGET // SUSTAINABLE_COORDINATION
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={itemVariants}
            className="p-8 bg-slate-950/50 border border-slate-800/60 rounded-2xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300 h-full flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Eye className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-white font-bold text-xl tracking-wide mb-3">Our Vision</h3>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-6">
                To be the undisputed global authority in digital twins and BIM coordination, leading the transition toward fully pre-engineered, prefabricated, and robotics-compatible construction templates.
              </p>
            </div>
            <div className="font-mono text-[9px] text-slate-600 border-t border-slate-900 pt-4">
              FOCUS_TARGET // PREFABRICATION_READY
            </div>
          </motion.div>

          {/* Value Card */}
          <motion.div
            variants={itemVariants}
            className="p-8 bg-slate-950/50 border border-slate-800/60 rounded-2xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300 h-full flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Award className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-white font-bold text-xl tracking-wide mb-3">Core Philosophy</h3>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-6">
                Rigid adherence to global architectural standards, relentless pursuit of zero-clash tolerances, and complete data transparency for multi-disciplinary project teams.
              </p>
            </div>
            <div className="font-mono text-[9px] text-slate-600 border-t border-slate-900 pt-4">
              FOCUS_TARGET // INTEGRITY_STANDARDS
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
