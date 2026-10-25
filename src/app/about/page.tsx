import type { Metadata } from "next";

import About from "components/sections/About";
import { getContent } from "lib/content.ts";

export const metadata: Metadata = { title: "About" };

const AboutPage = async () => <About profile={(await getContent()).profile} />;

export default AboutPage;
