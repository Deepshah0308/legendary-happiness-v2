import { LucideIcon } from "lucide-react";

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  username: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  url: string;
  description: string;
  achievements: string[];
}

export interface Project {
  title: string;
  company?: string;
  description: string;
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  technologies: string[];
  proficiency: number; // 0-100 for chart
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Profile {
  name: string;
  role: string;
  email: string;
  summary: string;
}