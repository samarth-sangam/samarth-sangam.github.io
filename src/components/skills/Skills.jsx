import React from "react";
import { makeStyles } from "@material-ui/core/styles";

//components
import Skill from "components/skills/Skill";

const useStyle = makeStyles((theme) => ({
  skills: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const skills = [
  {
    description: "Built amazon clone, Portfolio, application UI at Comviva",
    title: "React",
    icon: "fab fa-react",
    svgIcon: "ReactIcon",
    color: "#61dbfb",
  },
  {
    description: "Built geocode with Mapbox API and Heroku",
    title: "Node.js",
    icon: "fab fa-node-js",
    svgIcon: "NodeIcon",
    color: "#3c873a",
  },
  {
    description: "Built room based chat application with Socket.io and express",
    title: "Javascript",
    icon: "fab fa-js-square",
    color: "#f0db4f",
  },
  {
    description: "Built COL(User management application) using Spring boot",
    title: "Java",
    icon: "fab fa-java",
    svgIcon: "JavaIcon",
    color: "orange",
  },
  {
    description:
      "Used Git for all of my projects so far. I have used Git for version control at Rakuten",
    title: "Git",
    icon: "fab fa-git-alt",
    svgIcon: "GitIcon",
    color: "#F1502F",
  },
  {
    description: "Used SVN for all the projects at Comviva",
    title: "SVN",
    icon: "fab fa-git-alt",
    svgIcon: "SVNIcon",
    color: "#ffffff",
  },
  {
    description: "Built task-manager-api, room based chat application, gecode",
    svgIcon: "ExpressIcon",
    title: "Express.js",
  },
  {
    description:
      "Built part of Rakuten ID system with MySQL NDB Cluster at Rakuten India",
    title: "Spring",
    svgIcon: "SpringIcon",
  },
  {
    description:
      "Deployed Gecode, room based chat application, and task-manager-api",
    title: "Heroku",
    svgIcon: "HerokuIcon",
  },
  {
    description: "Deployed amazon clone, built various functions for it.",
    title: "Firebase",
    svgIcon: "FirebaseIcon",
  },
  {
    description: "Wrote multiple Ansible scripts for application at Comviva",
    title: "Ansible",
    svgIcon: "AnsibleIcon",
    color: "#ffffff",
  },
];

const Skills = () => {
  const classes = useStyle();
  return (
    <React.Fragment>
      <div id="to-skills-anchor" className="anchor"></div>
      <section className={classes.skills + " section"}>
        {skills.map((skill) => (
          <Skill key={skill.title} {...skill} />
        ))}
      </section>
    </React.Fragment>
  );
};

export default Skills;
