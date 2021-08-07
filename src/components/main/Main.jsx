import React from "react";

import Home from "components/home/Home";
import Skills from "components/main/Skills";
import Contact from "components/main/Contact";
import Posts from "components/main/Posts";
import Experience from "components/main/Experience";

const Main = () => {
  return (
    <main>
      <Home />
      <Skills />
      <Contact />
      <Posts />
      <Experience />
    </main>
  );
};

export default Main;
