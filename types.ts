export interface ExperienceContent {
  category?: string; // e.g. "LEADERSHIP & OPERATIONS"
  bullets: string[];
}

export interface ExperiencePosition {
  title: string;
  period: string;
  companyOverride?: string; // For grouped earlier roles  (e.g. Shell, Fifth Media)
  localLogoOverride?: string; // For grouped earlier roles
  locationOverride?: string; // For grouped earlier roles
  techStackOverride?: string[]; // For grouped earlier roles
  idSuffix?: string; // Custom ID suffix for display (e.g., "01", "02")
  headlineAchievement?: string; // NEW: Featured achievement for the role
  content: ExperienceContent[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  logo: string; // Added logo property
  localLogo?: string;
  isWordmark?: boolean; // Added to support wordmark logos
  location: string;
  logoInitials: string;
  icon?: any;
  techStack?: string[];
  channels?: string[]; // Added communication channels
  awards?: { title: string; issuer: string }[]; // Added awards
  positions: ExperiencePosition[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  // description: string; // DEPRECATED in favor of structured format
  challenge: string;
  solution: string;
  result: string;
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

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  description: string;
  icon?: any;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  icon?: any;
}

export interface NavItem {
  label: string;
  href: string;
}
