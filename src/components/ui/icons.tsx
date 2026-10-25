import type { ElementType } from "react";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";

import ansible from "assets/icons/ansible.svg";
import expressjs from "assets/icons/expressjs.svg";
import firebase from "assets/icons/firebase.svg";
import git from "assets/icons/git.svg";
import heroku from "assets/icons/heroku.svg";
import java from "assets/icons/java.svg";
import nodejs from "assets/icons/nodejs.svg";
import react from "assets/icons/react.svg";
import springFramework from "assets/icons/spring-framework.svg";
import subversion from "assets/icons/subversion.svg";
import type { Skill } from "lib/types.ts";

// Keys match the file names in src/assets/icons; add a line here when adding a logo.
const LOGOS: Record<string, typeof java> = {
  ansible,
  expressjs,
  firebase,
  git,
  heroku,
  java,
  nodejs,
  react,
  "spring-framework": springFramework,
  subversion,
};

const MediumIcon = () => <Box component="i" aria-hidden className="fab fa-medium" sx={{ fontSize: 20 }} />;

const LINK_ICONS: Record<string, ElementType> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  medium: MediumIcon,
  email: EmailIcon,
  website: LanguageIcon,
};

export const LinkIconFor = ({ icon }: { icon: string }) => {
  const Component = LINK_ICONS[icon] ?? LinkIcon;
  return <Component />;
};

export const SkillLogo = ({ logo, faIcon, color }: Pick<Skill, "logo" | "faIcon" | "color">) => {
  const Logo = logo ? LOGOS[logo] : undefined;
  if (Logo) return <Logo aria-hidden style={{ height: 40, width: "100%" }} />;
  return <Icon aria-hidden className={faIcon} sx={{ fontSize: 40, width: "auto", color }} />;
};
