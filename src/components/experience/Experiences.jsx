import React from "react";

//Material UI components
import { makeStyles } from "@material-ui/core/Styles";
import Typography from "@material-ui/core/Typography";

//components
import Experience from "components/experience/Experience";
import PersonalWork from "components/experience/PersonalWork";

const useStyle = makeStyles((theme) => ({
  experiences: {
    display: "flex",
    width: "100%",
    flexDirection: "column-reverse",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const experiences = [
  {
    company: "Rakuten India",
    title: "Technical Intern",
    projects: [
      {
        name: "Rakuten ID System",
        descriptions: [
          "Worked on a POC on the migration of database used in ID System to MySQL Cluster (NDB).",
          "Developed a web application using spring boot, MySQL connector/j, and clusterJ. Performance tested the web application using JMeter.",
        ],
      },
    ],
    stacks: [
      "Spring Boot",
      "MySQL NDB Cluster",
      "JMeter",
      "ClusterJ",
      "MySQL Connector/J",
    ],
    year: "Jan 2019 - Jun 2019",
  },
  {
    company: "Comviva India",
    title: "Software Engineer",
    projects: [
      {
        name: "OAM(Monitoring, fault detection, notification system)",
        descriptions: [
          "Responsible for creating Rest APIs and UI to store mutliple dashboards for mutliple users with dynamic panels addition.",
          "Responsible for migration from jQuery UI to React with new feature requests.",
          "Responsible for setting the architecture of react application.",
          "Wrote highly maintainable, solid code for UI system, earning consistent praise from subsequent developers since the initial version.",
          "Achieved code coverage of 80% by writing Unit tests for UI.",
          "User experience increased by a positive 75% since the migration from jQuery to React. (Measured using Lighthouse tool)",
          "Improved system performance by making proactive adjustments and resolving bugs.",
          "Developed Telegraf plugins to monitoring system KPI and used the KPI to develop Grafana dashboards.",
          "Developed APIs to integrate OAM (Alert system) with SMAX ticketing tool.",
          "Developed Plugins for Nagios monitoring tool to monitor system KPIs and database KPIs.",
          "Revised, modularized, and updated old code bases to modern development standards, reducing operating costs and improving functionality.",
        ],
      },
      {
        name: "Omega(Reporting Tool) - Addition Responsiblity with OAM",
        descriptions: [
          "Responsible for mutliple configuration for the clients.",
        ],
      },
    ],
    stacks: [
      "React",
      "PHP",
      "Nagios",
      "Grafana",
      "Telegraf",
      "Shell Scripting",
      "Ansible",
      "Perl",
      "Java",
    ],
    year: "Sept 2019 - Jun 2021",
  },
  {
    company: "Comviva India",
    title: "Senior Software Engineer",
    projects: [
      {
        name: "OAM(Monitoring, fault detection, notification system)",
        descriptions: [
          "Responsible for internationalization of UI used react-i18n to achieve.",
          "Responsible for achieving 80% of code coverage through Unit testing for UI.",
          "Responsible for achieving various data visualization for dashboard. Created multiple Rest APIs using PHP symphony and intergrated using amCharts to visualize the data.",
        ],
      },
    ],
    stacks: [
      "React",
      "PHP",
      "Nagios",
      "Grafana",
      "Telegraf",
      "Shell Scripting",
      "Ansible",
      "Perl",
    ],
    year: "Jul 2021 - Present",
  },
];

const personalWorks = [
  {
    title: "Task Manager API",
    details:
      "Rest API for task manager, Postman API documentation link can be found at my github repository. Note: Application link is to call APIs and UI is in progress.",
    stacks: ["Express", "Node.js", "Mongoose", "Jest", "Heroku-deployment"],
    applicationLink: "https://samarth-task-manager.herokuapp.com/",
    githubLink: "https://github.com/samarth-sangam/task-manager-api",
  },
  {
    title: "Node Gecode",
    details: "Gecode of address using Node",
    stacks: ["Express", "Node.js", "hbs", "Heroku-deployment"],
    applicationLink: "https://samarth-geocode-application.herokuapp.com/",
    githubLink: "https://github.com/samarth-sangam/node-geocode",
  },
  {
    title: "Chat App",
    details: "Room based chat web application, filter out explicit language.",
    stacks: ["express", "socket-io", "node.js"],
    applicationLink: "https://samarth-chat-app.herokuapp.com/",
    githubLink: "https://github.com/samarth-sangam/chat-app",
  },
  {
    title: "Amazon clone",
    details:
      "Amazon clone built using React, Context API, Firebase and Firebase authentication.",
    stacks: [
      "React",
      "React-Context",
      "Firebase",
      "SCSS",
      "express",
      "Stripe.js",
    ],
    applicationLink: "https://clone-95b79.web.app/",
    githubLink: "https://github.com/samarth-sangam/amazon-clone",
  },
];

const Experiences = () => {
  const classes = useStyle();

  return (
    <React.Fragment>
      <div id="to-experience-anchor"></div>
      <div className={classes.experiences + " section"}>
        {personalWorks.map((personalWork) => (
          <PersonalWork key={personalWork.title} {...personalWork} />
        ))}
        <Typography variant="h6">---- Personal Projects ----</Typography>
        {experiences.map((experience) => (
          <Experience
            key={experience.company + "-" + experience.title}
            {...experience}
          />
        ))}
        <Typography variant="h6">---- Work Experience ----</Typography>
      </div>
    </React.Fragment>
  );
};

export default Experiences;
