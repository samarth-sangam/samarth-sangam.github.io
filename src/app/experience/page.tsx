import type { Metadata } from "next";

import Experience from "components/sections/Experience";
import { getContent } from "lib/content.ts";

export const metadata: Metadata = { title: "Experience" };

const ExperiencePage = async () => <Experience experience={(await getContent()).experience ?? []} />;

export default ExperiencePage;
