export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CounterItem {
  label: string;
  value: number;
  suffix: string;
}

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Architectural' | 'Structural' | 'MEP' | 'Coordination';
  image: string;
  description: string;
  results: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  projectType: string;
  message: string;
}
