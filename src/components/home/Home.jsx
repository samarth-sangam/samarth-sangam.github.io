import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

//components
import Profiles from "components/home/Profiles";
import Typed from "components/common/Typed";

const useStyles = makeStyles((theme) => ({
  box: {
    height: "calc(100vh - 52px)",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  textBold: {
    fontWeight: "bold",
  },
  description: {
    paddingRight: "128px",
    marginRight: "128px",
    paddingLeft: "128px",
    marginLeft: "128px",
    [theme.breakpoints.down("md")]: {
      paddingRight: "64px",
      marginRight: "64px",
      paddingLeft: "64px",
      marginLeft: "64px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: "32px",
      marginRight: "32px",
      paddingLeft: "32px",
      marginLeft: "32px",
    },
  },
  nameAnimation: {
    overflow:
      "hidden" /* Ensures the content is not revealed until the animation */,
    borderRight: ".15em solid orange" /* The typwriter cursor */,
    whiteSpace: "nowrap" /* Keeps the content on a single line */,
    margin: "0 auto" /* Gives that scrolling effect as the typing happens */,
    LetterSpacing: ".15em" /* Adjust as needed */,
    animation: "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.box}>
        <Typography variant="subtitle1" align="center">
          I am
        </Typography>
        <Typography variant="h4" align="center" className={classes.textBold}>
          <Typed
            strings={["Samarth Sangam", "Innovative", "Creative", "Adaptive"]}
            typeSpeed={40}
            backSpeed={40}
            loop
          />
        </Typography>
        <Typography variant="h6" align="center">
          Full Stack Web Developer
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.description}
        >
          I'm Bangalore, India based Developer. I have{" "}
          <span className={classes.textBold}>
            {" "}
            {new Date().getUTCFullYear() - 2019}+{" "}
          </span>
          experience in developing web applications. Through consistent practice
          and learning, I produce high standard maintainable softwares.
        </Typography>
        <Profiles />
      </Box>
    </Container>
  );
};

export default Home;
