import type { Metadata } from "next";

import Contact from "components/sections/Contact";
import { getContent } from "lib/content.ts";

export const metadata: Metadata = { title: "Contact" };

const ContactPage = async () => {
  const { profile, links = [], contact } = await getContent();
  return <Contact profile={profile} links={links} contact={contact} />;
};

export default ContactPage;
