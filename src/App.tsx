import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone, MessageSquare, ArrowUp, Zap, Server, ShieldCheck } from 'lucide-react';
import { METADATA } from './data';

// Component Imports
import Navbar from './components/Navbar';
import InteractiveCanvasBim from './components/InteractiveCanvasBim';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProcessTimeline from './components/ProcessTimeline';
import ProjectShowcase from './components/ProjectShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ContactForm from './components/ContactForm';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import DashboardPortal from './components/DashboardPortal';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle showing back-to-top button on scroll
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="apex-bim-app" className="min-h-screen bg-slate-950 text-white font-sans antialiased overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* =========================================
          SECTION 1: HERO SECTION
          ========================================= */}
      <header id="hero" className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0A0D16]">
        
        {/* Tech Grid & Subtle Radial Background Light */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Premium Pitch */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left">
              
              {/* Decorative Enterprise Banner Tag */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400 font-mono text-[10px] md:text-xs uppercase tracking-widest"
              >
                <Zap className="w-4 h-4 text-blue-500 shrink-0" />
                <span>ISO 19650 COMPLIANT BIM PIPELINES</span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white font-sans uppercase"
                >
                  Building Intelligence <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-extrabold">
                    Before Construction
                  </span> <br />
                  Begins
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-slate-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl"
                >
                  Advanced BIM Solutions for Architecture, Engineering and Construction Projects Worldwide.
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 rounded-sm transition-all duration-300 shadow-lg shadow-blue-900/20 cursor-pointer"
                >
                  Book Consultation
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-[#0F172A] hover:bg-white bg-slate-900 border border-slate-700 rounded-sm transition-all duration-200 cursor-pointer"
                >
                  View Projects
                </button>
              </motion.div>

              {/* Live telemetry metadata bar under button to enhance engineering feel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-6 border-t border-slate-900/80 flex items-center gap-6 text-[10px] md:text-xs font-mono text-slate-500"
              >
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-500" />
                  <span>MODEL STATE: LOD_500</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>SECURE CDE SYNC</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: 3D Wireframe Skyscraper (Interactive HTML5 Canvas) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 w-full h-full relative"
            >
              <InteractiveCanvasBim />
            </motion.div>

          </div>
        </div>
      </header>

      {/* =========================================
          SECTION 2 & 3: TRUST AND ABOUT COMPANY
          ========================================= */}
      <AboutSection />

      {/* =========================================
          SECTION 4: CORE SERVICES BENTO GRID
          ========================================= */}
      <ServicesSection />

      {/* =========================================
          SECTION 5: COORDINATED OPERATIONAL PROCESS
          ========================================= */}
      <ProcessTimeline />

      {/* =========================================
          SECTION 6: PROJECT SHOWCASE GALLERY
          ========================================= */}
      <ProjectShowcase />

      {/* =========================================
          SECTION 7 & 8: WHY CHOOSE US & TECH STACK
          ========================================= */}
      <WhyChooseUs />

      {/* =========================================
          SECTION 9: TESTIMONIALS SLIDER
          ========================================= */}
      <TestimonialsSection />

      {/* =========================================
          SECTION 9.5: SECURE BIM PARTNER WORKSPACE
          ========================================= */}
      <section id="workspace" className="py-24 bg-[#0A0D16] relative border-y border-slate-900 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
              LOD 500 Collaboration Hub
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
              Client & Partner <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-extrabold">
                Workspace Portal
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto">
              Track active 3D modeling stages, review Navisworks clash reports, and message our coordinating engineers in a single secure environment.
            </p>
          </div>

          <DashboardPortal />
        </div>
      </section>

      {/* =========================================
          SECTION 10: FAQ ACCORDIONS
          ========================================= */}
      <FaqSection />

      {/* =========================================
          SECTION 11 & 12: INTAKE FORM AND HEADQUARTERS
          ========================================= */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        {/* Background grids and details */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.025),transparent)] bg-[size:32px_32px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Section 11: Real Working Contact Form */}
            <ContactForm />

            {/* Section 12: Maps Location & Details Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Corporate Headquarters
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Establish Direct Connection
                </h2>
                <p className="text-slate-400 font-light leading-relaxed">
                  Submit your engineering coordinates or laser scans directly using our Web3Forms gate, or visit our central San Francisco studio.
                </p>
              </div>

              {/* Reusable map block component */}
              <LocationMap />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 13: FOOTER
          ========================================= */}
      <Footer />

      {/* =========================================
          EXTRA FEATURES: FLOATING ACTIONS
          ========================================= */}
      
      {/* 1. Floating WhatsApp Assistance Button */}
      <div className="fixed bottom-6 left-6 z-40 group">
        <a
          href={`https://wa.me/${METADATA.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-600/15 hover:bg-emerald-500 transition-all duration-300 scale-100 hover:scale-105 active:scale-95"
          aria-label="Contact support on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-950 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg font-mono">
          Speak with a BIM Expert
        </div>
      </div>

      {/* 2. Sticky Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all duration-200 scale-100 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
