import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background radial details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Technical FAQs
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans mb-5">
            BIM Inquiries & Standards
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Detailed engineering answers regarding workflows, levels of detail, point-cloud files, data security, and collaborative specifications.
          </p>
        </div>

        {/* FAQs Accordion Container */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-slate-950 border-blue-500/30 shadow-lg shadow-blue-500/5'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-950/70 hover:border-slate-800'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5.5 flex justify-between items-center gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                      isOpen ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-400'
                    }`} />
                    <span className="text-white font-semibold text-base md:text-lg tracking-wide group-hover:text-blue-400 transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 shrink-0 transition-all duration-300 ${
                    isOpen ? 'rotate-180 bg-blue-600 border-blue-500 text-white' : 'group-hover:bg-slate-800'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-900/80">
                        <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed pl-8.5">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
