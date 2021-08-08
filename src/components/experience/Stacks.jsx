import React from "react";

//Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

//components
import Stack from "components/experience/Stack";

const useStyles = makeStyles((theme) => ({
  stacks: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    " & > *": {
      width: "max-content",
      marginRight: theme.spacing(0.5),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      borderWidth: "1px",
      borderRadius: "0.75rem",
      backgroundColor: "rgb(224, 224, 224)",
      outline: "none",
    },
  },
}));

const Stacks = ({ stacks }) => {
  const classes = useStyles();
  return (
    <Box className={classes.stacks}>
      {stacks.map((stack) => (
        <Stack key={stack} stack={stack} />
      ))}
    </Box>
  );
};

export default Stacks;
