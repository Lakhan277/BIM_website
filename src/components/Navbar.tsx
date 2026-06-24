import { useState, useEffect } from 'react';
import { Menu, X, Building, ArrowRight, Phone } from 'lucide-react';
import { METADATA } from '../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
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

  const navLinks = [
    { name: 'Services', target: 'services' },
    { name: 'About', target: 'about' },
    { name: 'Process', target: 'process' },
    { name: 'Projects', target: 'projects' },
    { name: 'Why Apex', target: 'why-choose-us' },
    { name: 'Portal Workspace', target: 'workspace' },
    { name: 'FAQs', target: 'faqs' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Building className="w-5.5 h-5.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-wider text-lg uppercase leading-none font-sans">
                APEX<span className="text-blue-500 font-extrabold font-mono">BIM</span>
              </span>
              <span className="text-slate-400 font-mono text-[9px] tracking-widest uppercase">
                Engineering Services
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="text-slate-300 hover:text-white font-medium text-[14px] tracking-wide transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* CTA Phone & Contact */}
            <div className="flex items-center gap-4 border-l border-slate-800 pl-6 ml-2">
              <a
                href={`tel:${METADATA.phoneNumber}`}
                className="hidden xl:flex items-center gap-2 text-slate-400 hover:text-blue-400 font-mono text-xs transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                {METADATA.phoneNumber}
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="relative inline-flex items-center justify-center px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 shadow-md shadow-blue-600/15 cursor-pointer hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                Book Consultation
              </button>
            </div>
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="flex lg:hidden items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-xl border border-slate-800 bg-slate-900/40 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dimmed Backdrop Overlay when Mobile Menu is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-[#0A0D16] border-l border-slate-800/80 z-45 transform transition-transform duration-300 ease-out lg:hidden flex flex-col justify-between p-6 pt-24 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 pb-2 border-b border-slate-900">
            Navigation Menu
          </div>
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="text-left text-slate-200 hover:text-blue-400 font-bold text-base tracking-wide py-2.5 px-3 rounded-lg hover:bg-slate-900/50 transition-all duration-150 cursor-pointer flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <span className="text-[10px] font-mono text-slate-600 group-hover:text-blue-500 transition-colors">
                  // {link.target.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-slate-900">
          <div className="px-3">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Direct Engineering Line</span>
            <a
              href={`tel:${METADATA.phoneNumber}`}
              className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 font-mono text-sm transition-colors duration-200"
            >
              <Phone className="w-4 h-4 text-blue-500" />
              {METADATA.phoneNumber}
            </a>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/20"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
