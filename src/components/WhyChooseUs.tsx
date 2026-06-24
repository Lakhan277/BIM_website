import { motion } from 'motion/react';
import { ShieldCheck, PiggyBank, Users, FastForward, Globe2, Network, CheckCircle, Terminal, Layers } from 'lucide-react';
import { BENEFITS, TECH_STACK } from '../data';

export default function WhyChooseUs() {
  const getBenefitIcon = (title: string) => {
    switch (title) {
      case 'Reduced Rework': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Cost Savings': return <PiggyBank className="w-5 h-5 text-blue-400" />;
      case 'Improved Collaboration': return <Users className="w-5 h-5 text-cyan-400" />;
      case 'Faster Delivery': return <FastForward className="w-5 h-5 text-yellow-400" />;
      case 'Global Standards': return <Globe2 className="w-5 h-5 text-indigo-400" />;
      case 'Better Coordination': return <Network className="w-5 h-5 text-purple-400" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="why-choose-us" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background blueprint layout overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 7 Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Value Matrix
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Why Contractors Align With Apex
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            We deliver bankable building intelligence, translating complex physical blueprints into synchronized, clash-free digital parameters.
          </p>
        </div>

        {/* Section 7 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-8 bg-slate-900/30 backdrop-blur-md border border-slate-800/60 rounded-2xl relative overflow-hidden group hover:bg-slate-900/65 hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Corner tech notch */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-slate-800/30 border-b border-l border-slate-700/60 rounded-bl-xl group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors duration-300 flex items-center justify-center">
                <span className="font-mono text-[9px] text-slate-500 group-hover:text-white">0{index + 1}</span>
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center mb-6">
                  {getBenefitIcon(benefit.title)}
                </div>

                <h3 className="text-white font-semibold text-lg md:text-xl tracking-wide mb-3">
                  {benefit.title}
                </h3>

                <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-6">
                  {benefit.description}
                </p>
              </div>

              <div className="font-mono text-[9px] text-slate-600 border-t border-slate-900/80 pt-4 flex justify-between">
                <span>AUDIT // RESOLUTION</span>
                <span className="text-emerald-400 font-semibold uppercase">VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 8: Technology Stack Area */}
        <div className="border-t border-slate-800/80 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Tech explanation column */}
            <div className="lg:col-span-4 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                Engineering Pipeline
              </div>
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                Our Core Technical Stack
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                We operate within industry-standard common data environments using advanced parametric CAD platforms and automated visual scripting pipelines to customize layouts.
              </p>
            </div>

            {/* Tech icons bento grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {TECH_STACK.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl relative overflow-hidden group flex flex-col justify-between h-[130px]"
                >
                  {/* Decorative faint grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/60 flex items-center justify-center text-blue-500 font-bold font-mono text-xs">
                      {tech.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-mono text-[8px] text-blue-400/90 bg-blue-500/10 border border-blue-500/25 px-2 py-0.5 rounded uppercase">
                      LOD_OK
                    </span>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-blue-400 transition-colors duration-200">
                      {tech.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">
                      {tech.tag}
                    </p>
                  </div>

                  <div className="border-t border-slate-900/80 pt-2 flex justify-between items-center text-[8px] font-mono text-slate-600">
                    <span>STANDARD // BS_1192</span>
                    <span className="text-slate-500">{tech.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
