import { ServiceItem, CounterItem, TimelineStep, ProjectItem, TestimonialItem, FaqItem } from './types';

export const METADATA = {
  companyName: "Apex BIM Solutions",
  tagline: "Building Intelligence Before Construction Begins",
  clientEmail: "contact@apexbimsolutions.com",
  phoneNumber: "+1 (800) 555-0192",
  whatsappNumber: "+18005550192",
  officeLocation: "Suite 450, Tech Tower, 100 Innovation Way, San Francisco, CA 94105",
  workingHours: "Monday - Friday: 8:00 AM - 6:00 PM (PST)",
};

export const COUNTERS: CounterItem[] = [
  { label: "Projects Delivered", value: 450, suffix: "+" },
  { label: "Years Experience", value: 12, suffix: "+" },
  { label: "Countries Served", value: 24, suffix: "" },
  { label: "BIM Experts", value: 85, suffix: "+" }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "arch-bim",
    title: "Architectural BIM",
    description: "High-precision LOD 100 to LOD 500 digital representations of architectural elements, ensuring seamless spatial configuration and design compliance.",
    iconName: "Home"
  },
  {
    id: "struct-bim",
    title: "Structural BIM",
    description: "Robust, parametric models of structural framing, foundations, and reinforcement detailing to support structural analyses and flawless structural workflows.",
    iconName: "Cpu"
  },
  {
    id: "mep-bim",
    title: "MEP BIM",
    description: "Fully coordinated mechanical, electrical, plumbing, and fire protection layouts optimized for space saving, energy efficiency, and operational access.",
    iconName: "Wrench"
  },
  {
    id: "bim-coord",
    title: "BIM Coordination",
    description: "Integration of multi-disciplinary models into a single master assembly to establish spatial consensus and drive seamless cross-functional alignment.",
    iconName: "GitMerge"
  },
  {
    id: "clash-det",
    title: "Clash Detection",
    description: "Advanced automated clash testing via Navisworks to isolate, categorize, and resolve geometric interference prior to site mobilization.",
    iconName: "ShieldAlert"
  },
  {
    id: "scan-to-bim",
    title: "Scan To BIM",
    description: "Transforming high-density laser scan point cloud datasets into highly accurate, parametric Revit models for historic renovation and expansion projects.",
    iconName: "Radio"
  },
  {
    id: "revit-model",
    title: "Revit Modeling",
    description: "Comprehensive parametric families and system layouts built on Autodesk Revit, strictly following international BIM standards and naming conventions.",
    iconName: "Layers"
  },
  {
    id: "shop-drawings",
    title: "Shop Drawings",
    description: "Installation-ready fabrication drawings extracted from coordinated models, loaded with spatial coordinates, bills of materials, and precision dimensions.",
    iconName: "FileText"
  },
  {
    id: "const-doc",
    title: "Construction Documentation",
    description: "Unified drawing sets, schedules, and structural datasheets aligned perfectly with the coordinated 3D master model to simplify on-site execution.",
    iconName: "ClipboardCheck"
  },
  {
    id: "qty-takeoff",
    title: "Quantity Takeoff",
    description: "Precise QTO metrics and structural material estimates generated directly from detailed models to optimize budget allocation and eliminate waste.",
    iconName: "Calculator"
  }
];

export const PROCESS_STEPS: TimelineStep[] = [
  {
    step: 1,
    title: "Project Analysis",
    description: "Review of 2D plans, specifications, point clouds, and Execution Plans (BEP) to scope requirements, define Levels of Detail (LOD), and establish structural parameters."
  },
  {
    step: 2,
    title: "Model Development",
    description: "Creating high-fidelity parametric components and assembly structures in Autodesk Revit across Architectural, Structural, and MEP disciplines."
  },
  {
    step: 3,
    title: "Coordination",
    description: "Integrating individual models in Navisworks to identify and resolve clashes, hold weekly coordination sessions, and finalize structural interfaces."
  },
  {
    step: 4,
    title: "Quality Review",
    description: "Running rigid structural audits and validating models against global BIM standards, ensuring perfect parameter accuracy and standard compliant families."
  },
  {
    step: 5,
    title: "Final Delivery",
    description: "Exporting fully validated, coordinate-correct Revit files (.RVT), coordinated IFCs, clash reports, and precise shop drawing PDF/CAD sets for construction."
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Metro Plaza Financial Center",
    category: "Architectural",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    description: "LOD 400 architectural modeling of a sustainable, 52-story commercial skyscraper with complex parametric glass facade geometries and high-occupancy spaces.",
    results: [
      "Resolved 12,000+ potential spatial conflicts",
      "Cut material procurement errors by 18%",
      "Established fully interactive digital twin model"
    ]
  },
  {
    id: "proj-2",
    title: "Helix Advanced Transit Terminal",
    category: "Structural",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800",
    description: "Structural concrete and complex steel trusses modeling for a futuristic high-speed rail terminal with curved organic architecture and massive load profiles.",
    results: [
      "Zero steel assembly errors on-site",
      "Accelerated engineering design sign-off by 3.5 weeks",
      "Seamless structural integrity integration"
    ]
  },
  {
    id: "proj-3",
    title: "BioPharma Lab Complex",
    category: "MEP",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800",
    description: "Intricate coordination of HVAC ductwork, cleanroom electrical feeds, high-purity piping, and waste lines for a multi-million dollar pharmaceutical laboratory.",
    results: [
      "100% clash-free MEP system design",
      "Reduced spatial overhead requirements by 15%",
      "Prefabricated 80% of major duct conduits off-site"
    ]
  },
  {
    id: "proj-4",
    title: "Metropolitan Airport Expansion",
    category: "Coordination",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800",
    description: "Master BIM coordination and Navisworks conflict mitigation across 14 active engineering and design firms working on terminal extension programs.",
    results: [
      "Saved an estimated $1.2M in rework costs",
      "Reduced coordination cycle time by 40%",
      "Seamlessly integrated Scan-to-BIM laser surveys"
    ]
  }
];

export const BENEFITS = [
  {
    title: "Reduced Rework",
    description: "Identify and resolve geometric errors in virtual models before a single ounce of concrete is poured, sparing your budget from devastating on-site revisions."
  },
  {
    title: "Cost Savings",
    description: "Maximize procurement efficiency and eliminate construction waste with exact, automated material takeoffs and error-free shop drawings directly from coordinated models."
  },
  {
    title: "Improved Collaboration",
    description: "Establish a unified, high-integrity single source of truth that aligns general contractors, owners, and structural engineering disciplines in real-time."
  },
  {
    title: "Faster Delivery",
    description: "Accelerate fabrication pipelines and construction timelines by utilizing fully dimensioned, pre-coordinated modular assemblies designed for seamless fit."
  },
  {
    title: "Global Standards",
    description: "Every deliverable complies fully with international regulations including ISO 19650, AIA BIM protocols, and localized building information modeling guidelines."
  },
  {
    title: "Better Coordination",
    description: "Consolidate multifaceted design components (MEP, Architecture, Structure) using advanced conflict resolution matrices to optimize building clearance."
  }
];

export const TECH_STACK = [
  { name: "Autodesk Revit", tag: "Primary Modeling Engine", rating: "LOD 500 Compliant" },
  { name: "Navisworks", tag: "Clash Detection & Analysis", rating: "Automated Reports" },
  { name: "AutoCAD", tag: "Legacy Integration & CAD", rating: "Precision Detailing" },
  { name: "Civil 3D", tag: "Site Grading & Utilities", rating: "Topography Models" },
  { name: "Dynamo", tag: "Visual Scripting & Automation", rating: "Custom Workflows" },
  { name: "BIM 360", tag: "Cloud Collaboration & CDE", rating: "Real-time Sync" }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Arthur Pendelton",
    role: "Project Director",
    company: "Vanguard Builders",
    rating: 5,
    text: "Apex's MEP coordination services saved our project from several critical clashes in the central mechanical room that would have easily cost over $200k in site rework. Their models are incredibly precise and reliable."
  },
  {
    id: "t-2",
    name: "Elena Rostova",
    role: "Principal Architect",
    company: "Rostova Design Partners",
    rating: 5,
    text: "The Scan-to-BIM model generated by Apex was phenomenal. Laser point cloud scans of our historic theatre expansion were converted into clean, smart Revit families in less than two weeks, enabling perfect fitment."
  },
  {
    id: "t-3",
    name: "Marcus Vance",
    role: "Vice President of Infrastructure",
    company: "Pacific Rail Group",
    rating: 5,
    text: "Integrating Apex into our early design phases completely changed how we handle coordination. Weekly Navisworks clash reports were handled efficiently with clear responsibilities assigned to each contractor. Exceptional engineering!"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What Levels of Detail (LOD) do you support?",
    answer: "We support the full spectrum from LOD 100 (conceptual layout) through LOD 400 (fabrication-ready models) up to LOD 500 (as-built models for Facility Management and Digital Twin integration). Each phase is structured according to BIM Forum guidelines and custom project specifications."
  },
  {
    id: "faq-2",
    question: "How do you coordinate with multiple architects and engineers?",
    answer: "We establish a Common Data Environment (CDE) using Autodesk BIM 360/Construction Cloud, where all disciplines upload weekly updates. We conduct scheduled coordination meetings, tracking clashes in real-time with comprehensive reports, isolating and resolving conflicts cooperatively."
  },
  {
    id: "faq-3",
    question: "What inputs do you need to initiate a Scan-to-BIM project?",
    answer: "We require either point cloud files (such as .RCP, .RCS, .LAS, or .E57 format), registered point cloud data, or raw scan outputs with accurate survey control points. We also coordinate with local scanning companies to schedule the actual laser scans if you do not have point clouds already."
  },
  {
    id: "faq-4",
    question: "How do you ensure the privacy and security of project data?",
    answer: "All project data is managed on secure Enterprise servers and Autodesk Cloud directories with granular, role-based folder permissions. We are compliant with standard NDA protocols and have rigorous cyber security standards to protect intellectual property."
  },
  {
    id: "faq-5",
    question: "Can you generate Revit families for specific manufacturers?",
    answer: "Yes, we create highly detailed, smart, fully parametric Revit content and custom families loaded with electrical/mechanical connectors, thermal properties, cost data, and accurate geometry based on manufacturer sheets."
  }
];
