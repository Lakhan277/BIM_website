import { Building2, Mail, Phone, MapPin, Linkedin, Twitter, Github, Youtube, ArrowUpCircle } from 'lucide-react';
import { METADATA, SERVICES } from '../data';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  const quickLinks = [
    { name: 'Services Grid', target: 'services' },
    { name: 'About Mission', target: 'about' },
    { name: 'Operational Process', target: 'process' },
    { name: 'Milestone Projects', target: 'projects' },
    { name: 'Why Apex', target: 'why-choose-us' },
    { name: 'FAQs', target: 'faqs' },
    { name: 'Contact Intake', target: 'contact' },
  ];

  return (
    <footer id="footer" className="bg-slate-950 border-t border-slate-900 pt-20 pb-8 text-slate-400 relative overflow-hidden">
      {/* Decorative inner gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Column 1: Company Logo Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold tracking-wider text-base uppercase leading-none font-sans">
                APEX<span className="text-blue-500 font-extrabold font-mono">BIM</span>
              </span>
            </div>
            
            <p className="text-slate-500 text-sm font-light leading-relaxed max-w-sm">
              We engineer full-cycle parametric Building Information Models to synchronize multi-disciplinary designs, eliminating geometric errors and securing architectural integrity worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200">
                <Github className="w-4.5 h-4.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200">
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase font-mono">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="hover:text-white transition-colors duration-200 text-slate-500 text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Shortlist */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase font-mono">
              Core BIM Services
            </h4>
            <ul className="space-y-3 text-sm">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors duration-200 text-slate-500 text-left cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-mono">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} APEX BIM SOLUTIONS. ALL RIGHTS RESERVED.</span>
            <span>SPEC: ISO 19650 COMPLIANT</span>
          </div>

          <div className="flex gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-400 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer">
              BACK TO TOP <ArrowUpCircle className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
