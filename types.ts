export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  github: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'AI';
  level: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}
