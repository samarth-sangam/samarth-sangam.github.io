import React from "react";

import Home from "components/home/Home";
import Skills from "components/skills/Skills";
import Contact from "components/contact/Contact";
import Posts from "components/post/Posts";
import Experiences from "components/experience/Experiences";

const Main = () => {
  return (
    <main>
      <Home />
      <Skills />
      <Experiences />
      <Posts />
      <Contact />
    </main>
  );
};

export default Main;
