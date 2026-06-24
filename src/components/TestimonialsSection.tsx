import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, Award, ShieldCheck, Building2 } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Mock global engineering contractor labels representing clients
  const clientLogos = [
    { name: "Vanguard Builders", type: "Developer" },
    { name: "Rostova Design", type: "Architecture" },
    { name: "Pacific Rail", type: "Infrastructure" },
    { name: "Apex Struct", type: "Structural" },
    { name: "Skanska Corp", type: "Contractor" }
  ];

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background blueprint details */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.02),transparent)] bg-[size:36px_36px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Peer Endorsements
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Coordinated Success Logs
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Read validated feedback from executive project directors and principal architects who synchronized their builds using our platform.
          </p>
        </div>

        {/* Testimonials Slider Body */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative bg-slate-950/60 border border-slate-800/80 p-8 md:p-12 rounded-2xl shadow-2xl overflow-hidden">
            {/* Background Quotes Watermark */}
            <Quote className="absolute right-8 top-8 w-32 h-32 text-slate-900/40 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 relative z-10"
              >
                {/* Stars Indicator */}
                <div className="flex gap-1.5 text-amber-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-white text-base md:text-xl font-light italic leading-relaxed font-sans">
                  "{current.text}"
                </blockquote>

                {/* Reviewer Details */}
                <div className="flex justify-between items-end border-t border-slate-900/80 pt-6">
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg tracking-wide">
                      {current.name}
                    </h4>
                    <p className="text-slate-500 text-xs md:text-sm font-medium">
                      {current.role}, <span className="text-blue-400 font-semibold">{current.company}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>VERIFIED CLIENT</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav Arrows */}
            <div className="absolute right-6 bottom-6 flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Corporate Client Partner Logos Banner */}
        <div className="border-t border-slate-800/60 pt-16">
          <div className="text-center mb-8">
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">
              TRUSTED BY ENGINEERING LEADERS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-center items-center opacity-40 hover:opacity-75 transition-opacity duration-300">
            {clientLogos.map((logo, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-950/40 border border-slate-900/60 rounded-xl text-center space-y-1 group hover:bg-slate-950 hover:border-blue-500/10 transition-all duration-300"
              >
                <Building2 className="w-5 h-5 text-slate-500 mx-auto group-hover:text-blue-500 transition-colors duration-200" />
                <h4 className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-wider font-mono">
                  {logo.name}
                </h4>
                <p className="text-[9px] text-slate-600 uppercase font-mono">
                  {logo.type}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
