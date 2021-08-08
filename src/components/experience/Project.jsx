import React from "react";

//Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "disc",
  },
  cardActions: {
    justifyContent: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Project = ({ name, descriptions }) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
        {name}
      </Typography>
      <List dense className={classes.list}>
        {descriptions.map((description) => (
          <ListItem>
            <ListItemText primary={description}></ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Project;
