import type { Metadata } from "next";

import Skills from "components/sections/Skills";
import { getContent } from "lib/content.ts";

export const metadata: Metadata = { title: "Skills" };

const SkillsPage = async () => <Skills skills={(await getContent()).skills ?? []} />;

export default SkillsPage;
