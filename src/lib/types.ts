// Shape of content.yml.
export interface ThemeColors {
  primary?: string;
  secondary?: string;
}

export interface Site {
  title: string;
  description: string;
  user: string;
  host: string;
  theme?: { dark?: ThemeColors; light?: ThemeColors };
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  careerStart: number;
  avatar?: string;
  email?: string;
  typed?: string[];
  about?: string;
}

export interface SiteLink {
  label: string;
  icon: string;
  url: string;
}

export interface Skill {
  name: string;
  logo?: string;
  faIcon?: string;
  color?: string;
  items?: string[];
}

export interface Role {
  company: string;
  title: string;
  period: string;
  stack?: string[];
  summary?: string;
}

export interface Project {
  name: string;
  description: string;
  stack?: string[];
  github?: string;
  url?: string;
}

export interface Content {
  site: Site;
  profile: Profile;
  links?: SiteLink[];
  skills?: Skill[];
  experience?: Role[];
  github?: string;
  projects?: Project[];
  blog?: { medium: string; limit?: number };
  contact?: { heading?: string; message?: string };
}

export interface Post {
  title: string;
  url: string;
  date: string | undefined;
  tags: string[];
}
