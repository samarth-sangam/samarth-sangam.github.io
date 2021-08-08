import React from "react";

//Material UI Components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

//Components
import Projects from "components/experience/Projects";
import Stacks from "components/experience/Stacks";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    marginBottom: 0,
  },
  header: {
    display: "block",
    overflow: "hidden",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  content: {
    minHeight: 100,
    padding: "0 8px !important",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    width: "50%",
    textAlign: "left",
    fontStyle: "italic",
  },
  year: {
    width: "50%",
    textAlign: "right",
  },
  subHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

const Experience = ({ company, title, year, projects, stacks }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <CustomTooltip interactive title={company}>
            <Typography noWrap gutterBottom variant="h6">
              {company}
            </Typography>
          </CustomTooltip>
        }
        subheaderTypographyProps={{ className: classes.subHeader }}
        subheader={
          <React.Fragment>
            <CustomTooltip interactive title={title} component="span">
              <Typography
                className={classes.title}
                noWrap
                gutterBottom
                variant="subtitle2"
              >
                {title}
              </Typography>
            </CustomTooltip>
            <CustomTooltip interactive title={year} component="span">
              <Typography
                className={classes.year}
                noWrap
                gutterBottom
                variant="body2"
              >
                {year}
              </Typography>
            </CustomTooltip>
          </React.Fragment>
        }
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <Stacks stacks={stacks} />
        <Projects projects={projects} title={title} />
      </CardContent>
    </Card>
  );
};

export default Experience;
