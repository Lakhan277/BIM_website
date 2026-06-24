import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,41,59,0.2),transparent)] bg-[size:30px_30px] opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Technical Capabilities
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans mb-5 leading-tight"
          >
            High-Performance BIM Engineering
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg font-normal leading-relaxed"
          >
            Delivering synchronized, intelligent, and LOD 500 compliant models designed to mitigate risk, accelerate timelines, and drive precision on-site execution.
          </motion.p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            // Dynamically load the Lucide icon from string
            const LucideIcon = (Icons as any)[service.iconName] || Icons.HelpCircle;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                id={`service-card-${service.id}`}
                className="group relative h-full flex flex-col p-8 bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-900/70 hover:border-blue-500/30"
              >
                {/* Decorative Hover Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                {/* Service Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                  <LucideIcon className="w-5.5 h-5.5 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Service Title */}
                <h3 className="text-white font-semibold text-lg md:text-xl tracking-wide mb-3 group-hover:text-blue-400 transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Technical metadata tag for standard premium BIM feel */}
                <div className="mt-6 pt-5 border-t border-slate-800/60 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>SPEC // LOD_400_500</span>
                  <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold flex items-center gap-1">
                    DETAILS <Icons.ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
