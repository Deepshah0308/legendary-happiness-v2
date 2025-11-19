import { 
  Linkedin, 
  Github, 
  Mail,
  Cloud,
  Shield,
  Smartphone,
  Terminal,
  Network,
  Server,
  LucideIcon
} from "lucide-react";
import { Profile, SocialLink, SkillCategory, Experience, Project, Certification } from "./types";
import { resumeData } from './resumeData';

// Map string icon names from JSON to actual React components
const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Mail,
  Cloud,
  Shield,
  Smartphone,
  Terminal,
  Network,
  Server
};

export const PROFILE: Profile = resumeData.profile;

export const SOCIAL_LINKS: SocialLink[] = resumeData.socialLinks.map((link: any) => ({
  ...link,
  icon: iconMap[link.icon as string] || Mail
}));

export const SKILLS_DATA: SkillCategory[] = resumeData.skills;

// Icon mapping helper for skills
export const getSkillIcon = (category: string) => {
  if (category.includes("Azure")) return Cloud;
  if (category.includes("Security")) return Shield;
  if (category.includes("Intune")) return Smartphone;
  if (category.includes("Scripting")) return Terminal;
  if (category.includes("Firewall")) return Network;
  return Server;
};

export const EXPERIENCES: Experience[] = resumeData.experiences;

export const PROJECTS: Project[] = resumeData.projects;

export const CERTIFICATIONS: Certification[] = resumeData.certifications;