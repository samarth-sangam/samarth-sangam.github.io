import type { Metadata } from "next";

import Projects from "components/sections/Projects";
import { getContent } from "lib/content.ts";

export const metadata: Metadata = { title: "Projects" };

const ProjectsPage = async () => <Projects projects={(await getContent()).projects ?? []} />;

export default ProjectsPage;
