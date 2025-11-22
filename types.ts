export interface ExperienceContent {
  category?: string; // e.g. "LEADERSHIP & OPERATIONS"
  bullets: string[];
}

export interface ExperiencePosition {
  title: string;
  period: string;
  companyOverride?: string; // For grouped earlier roles (e.g. Shell, Fifth Media)
  content: ExperienceContent[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  logo: string; // Added logo property
  localLogo?: string;
  location: string;
  logoInitials: string;
  techStack?: string[];
  positions: ExperiencePosition[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  tech: string[];
  company: string;
  period: string;
  location: string;
}

export interface SkillMetric {
  subject: string;
  A: number; // Value
  fullMark: number;
}

export interface NavItem {
  label: string;
  href: string;
}
