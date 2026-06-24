import { MapPin, Phone, Mail, Clock, ShieldCheck, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { METADATA } from '../data';

export default function LocationMap() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(METADATA.officeLocation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Global Operations
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans mb-5">
            Engineering HQ & Locations
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Our central technical production studio manages BIM operations across North America, Europe, and Asia-Pacific.
          </p>
        </div>

        {/* Location Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Address Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-slate-900/40 backdrop-blur-md border border-slate-800/85 rounded-2xl shadow-xl relative overflow-hidden">
            {/* Holographic background crosshair */}
            <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-500 select-none">
              COORD_REF: 37.7879° N, 122.4075° W
            </div>

            <div className="space-y-8">
              
              {/* Header */}
              <div>
                <span className="font-mono text-[10px] text-blue-500 uppercase tracking-widest font-semibold block mb-1">
                  OFFICE_LOCATION
                </span>
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight font-sans">
                  San Francisco Studio
                </h3>
              </div>

              {/* Contact Pointers */}
              <div className="space-y-6">
                
                {/* Physical Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-slate-500 uppercase">Headquarters</span>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {METADATA.officeLocation}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-slate-500 uppercase">Phone Line</span>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-mono hover:text-blue-400 transition-colors duration-200">
                      <a href={`tel:${METADATA.phoneNumber}`}>{METADATA.phoneNumber}</a>
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-slate-500 uppercase">Email Link</span>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-mono hover:text-blue-400 transition-colors duration-200">
                      <a href={`mailto:${METADATA.clientEmail}`}>{METADATA.clientEmail}</a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-blue-400 shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-slate-500 uppercase">Studio Hours</span>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {METADATA.workingHours}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-8 border-t border-slate-800/60 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SECURE VISITING CREDENTIALS REQ.</span>
              </div>

              <button
                onClick={copyAddress}
                className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Address
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-7 h-96 lg:h-auto rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl relative bg-slate-950 min-h-[350px]">
            {/* Stylized map frame overlay */}
            <div className="absolute inset-0 border border-slate-800/80 pointer-events-none rounded-2xl"></div>
            
            {/* Embed Iframe */}
            <iframe
              title="Apex BIM HQ Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.084128549929!2d-122.40875!3d37.78786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808580858085%3A0x8085808580858085!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1624495200000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%) grayscale(20%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
