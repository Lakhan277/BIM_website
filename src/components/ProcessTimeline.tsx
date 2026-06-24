import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, Cpu, GitMerge, Radio, FileText, CheckCircle2, Terminal, Clock, Settings, FileSpreadsheet } from 'lucide-react';
import { PROCESS_STEPS } from '../data';

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(1);

  // Technical details for the detailed console based on the current step
  const stepDetails = [
    {
      duration: "3 - 5 Business Days",
      software: ["Autodesk Revit", "Navisworks Manage", "Excel"],
      outputs: [
        "LOD Matrix Draft (AIA G202 compliant)",
        "BIM Execution Plan (BEP) draft",
        "Coordinate system alignment configuration",
        "Source data integrity audit report"
      ],
      terminalCode: "APEX_INIT_SYS: LOAD_ARCH_2D_PLANS_v1.0.dwg\nAPEX_INIT_SYS: PARSING VECTOR CHUNKS...\nAPEX_INIT_SYS: WARNING - SPATIAL REF SYSTEM MISSING, RESOLVING FROM SITE SURVEY_02.PTS...\nAPEX_INIT_SYS: COORDINATE CONCURRENCE [SUCCESS]"
    },
    {
      duration: "2 - 4 Weeks (Sprints)",
      software: ["Autodesk Revit", "Dynamo Studio", "PointSense"],
      outputs: [
        "LOD 350-400 structural model components",
        "Custom Revit families creation with metadata parameters",
        "Intricate MEP layout assemblies",
        "Architectural envelope model generation"
      ],
      terminalCode: "APEX_MODEL_SYS: INITIATING GENERATIVE COMPONENT ENGINE...\nAPEX_MODEL_SYS: REVIT WORKSHARE ACTIVE (8 CONCURRENT EXPERTS)\nAPEX_MODEL_SYS: SYNCHRONIZING TO CENTRAL MODEL\nAPEX_MODEL_SYS: GENERATED 4,210 PARAMETRIC ASSEMBLY ELEMENTS // LOD 350 OK"
    },
    {
      duration: "1 - 2 Weeks",
      software: ["Navisworks Manage", "BIM 360 Coordination", "Revizto"],
      outputs: [
        "Interactive federated model in .NWD format",
        "Automated clash matrices and interference logs",
        "Conflict accountability matrices",
        "Weekly coordination meeting report logs"
      ],
      terminalCode: "APEX_CLASH_SYS: INITIATING HARD_CLASH_TEST [STRUCTURAL vs MEP]\nAPEX_CLASH_SYS: FOUND 842 DUCT INTERFERENCES WITH REBAR ENCLOSURES\nAPEX_CLASH_SYS: RUNNING AUTOMATED GROUPING HEURISTIC... DETECTED 12 LOGICAL REWORKS\nAPEX_CLASH_SYS: ASSIGNED RESOLUTION GROUPS 1-4 TO MEP_TEAM"
    },
    {
      duration: "3 - 5 Business Days",
      software: ["Navisworks Manage", "BIM 360 Cloud", "Internal Audits"],
      outputs: [
        "Standardized model health and audit check reports",
        "Revit model warning cleaning reports",
        "Parameter completion verification tables",
        "Geometric tolerance validation files"
      ],
      terminalCode: "APEX_QA_SYS: RUNNING ISO_19650 QUALITY PROTOCOLS...\nAPEX_QA_SYS: VALIDATING SHAPE PARAMETERS [100% SUCCESS]\nAPEX_QA_SYS: VERIFYING ELEMENT NAMING CONVENTIONS against BS 1192:2007\nAPEX_QA_SYS: HEALTH INDEX: 99.8% // NO UNMAPPED INFRASTRUCTURE DETECTED"
    },
    {
      duration: "Immediate Sign-off",
      software: ["Revit Central Server", "As-Built IFC files", "PDF Sheet sets"],
      outputs: [
        "Fully coordinated Master Revit files (.RVT)",
        "Open-BIM compliance export files (.IFC)",
        "Zero-clash structural shop drawings (.DWG / .PDF)",
        "Quantity takeoff sheets (.XLSX / .CSV)"
      ],
      terminalCode: "APEX_DLVR_SYS: INITIATING END-OF-LOD COMPILATION\nAPEX_DLVR_SYS: GENERATING COBie SPREADSHEETS FOR AS-BUILT LOGISTICS\nAPEX_DLVR_SYS: EXPORTING FEDERATED .IFC 4X3 MODEL\nAPEX_DLVR_SYS: FINAL DELIVERY ARCHIVE READY // SIGNED SECURITY KEY OK"
    }
  ];

  const currentDetail = stepDetails[activeStep - 1];

  const getStepIcon = (stepNum: number) => {
    switch (stepNum) {
      case 1: return <FileText className="w-5 h-5" />;
      case 2: return <Cpu className="w-5 h-5" />;
      case 3: return <GitMerge className="w-5 h-5" />;
      case 4: return <ClipboardCheck className="w-5 h-5" />;
      case 5: return <CheckCircle2 className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.03),transparent)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Operational Lifecycle
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans mb-5">
            Our Coordinated Workflow
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            A meticulous, five-phase BIM production model tailored to achieve zero-defect construction parameters.
          </p>
        </div>

        {/* Dynamic Timeline Split Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Vertical Interactive Timeline Selection */}
          <div className="lg:col-span-5 space-y-4">
            {PROCESS_STEPS.map((step) => {
              const isActive = step.step === activeStep;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex gap-4 items-start cursor-pointer ${
                    isActive
                      ? 'bg-slate-800/80 border-blue-500/40 shadow-lg shadow-blue-500/5 translate-x-2'
                      : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-950/80 hover:border-slate-800'
                  }`}
                >
                  {/* Step bubble */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}>
                    {getStepIcon(step.step)}
                  </div>

                  <div>
                    <span className="font-mono text-xs text-blue-500 font-semibold tracking-wide uppercase mb-1 block">
                      Phase 0{step.step}
                    </span>
                    <h3 className="text-white font-semibold text-lg mb-1.5 tracking-wide">
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {step.description.substring(0, 100)}...
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Tech Technical Console Screen */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col"
              >
                {/* Console Window Header */}
                <div className="bg-slate-900 px-5 py-4 border-b border-slate-800/80 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span className="font-mono text-xs text-slate-400 ml-2 select-none">
                      APEX_BIM_PROCESS_CONSOLE v4.2
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-500" />
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/60 uppercase">
                      ACTIVE_STG_0{activeStep}
                    </span>
                  </div>
                </div>

                {/* Console Content */}
                <div className="p-6 md:p-8 flex-grow space-y-6">
                  {/* Step Large Title */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-5 border-b border-slate-900">
                    <div>
                      <span className="font-mono text-[11px] text-blue-400 uppercase tracking-widest font-semibold">
                        CURRENTLY EXECUTING PHASE:
                      </span>
                      <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mt-1">
                        {PROCESS_STEPS[activeStep - 1].title}
                      </h3>
                    </div>

                    <div className="bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2 flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-slate-500 uppercase leading-none">
                          EST. TIMEFRAME
                        </span>
                        <span className="text-white text-xs font-semibold mt-1 font-sans">
                          {currentDetail.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Complete detailed description */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      PROCESS DESCRIPTION:
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {PROCESS_STEPS[activeStep - 1].description}
                    </p>
                  </div>

                  {/* Core Deliverables / Outputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <h4 className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
                        KEY OUTPUT DELIVERABLES:
                      </h4>
                      <ul className="space-y-2.5">
                        {currentDetail.outputs.map((out, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 mt-1.5 shrink-0"></span>
                            <span className="leading-relaxed font-sans">{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Integrated Tech stack */}
                    <div>
                      <h4 className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5 text-blue-500" />
                        INTEGRATED PLATFORMS:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentDetail.software.map((sw, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-900 border border-slate-800 text-white font-mono text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Simulated Terminal Window Code Stream */}
                  <div className="pt-4">
                    <h4 className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                      LIVE WORKFLOW LOG:
                    </h4>
                    <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[11px] text-emerald-400/90 whitespace-pre-line leading-relaxed h-[110px] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80 pointer-events-none"></div>
                      {currentDetail.terminalCode}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
