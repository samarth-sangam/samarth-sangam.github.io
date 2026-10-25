import Hero from "components/sections/Hero";
import { getContent } from "lib/content.ts";

const HomePage = async () => {
  const { site, profile, links = [] } = await getContent();
  return <Hero site={site} profile={profile} links={links} years={new Date().getFullYear() - profile.careerStart} />;
};

export default HomePage;
