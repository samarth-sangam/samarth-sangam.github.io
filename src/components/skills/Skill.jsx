import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";

//Icons
import { ReactComponent as SpringIcon } from "assets/icons/spring-framework.svg";
import { ReactComponent as ExpressIcon } from "assets/icons/expressjs.svg";
import { ReactComponent as HerokuIcon } from "assets/icons/heroku.svg";
import { ReactComponent as FirebaseIcon } from "assets/icons/firebase.svg";
import { ReactComponent as GitIcon } from "assets/icons/git.svg";
import { ReactComponent as SVNIcon } from "assets/icons/subversion.svg";
import { ReactComponent as JavaIcon } from "assets/icons/java.svg";
import { ReactComponent as ReactIcon } from "assets/icons/react.svg";
import { ReactComponent as NodeIcon } from "assets/icons/nodejs.svg";
import { ReactComponent as AnsibleIcon } from "assets/icons/ansible.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
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
    height: 150,
    padding: "0 8px !important",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  icon: {
    fontSize: "5rem",
  },
  svgIcon: {
    fontSize: "5rem",
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

const getSvgComponent = (svgName) => {
  const SVG_MAP = {
    SpringIcon,
    ExpressIcon,
    HerokuIcon,
    FirebaseIcon,
    GitIcon,
    JavaIcon,
    ReactIcon,
    NodeIcon,
    SVNIcon,
    AnsibleIcon,
  };

  return SVG_MAP[svgName];
};

const Skill = ({ title, color, description, icon, svgIcon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <CustomTooltip interactive title={title}>
            <Typography noWrap gutterBottom variant="h6">
              {title}
            </Typography>
          </CustomTooltip>
        }
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <div className={classes.iconWrapper}>
          {svgIcon ? (
            <SvgIcon
              className={classes.svgIcon}
              //   width="100%"
              viewBox="0 -50 125 125"
              preserveAspectRatio="xMidYMin"
              style={{ color: color }}
              component={getSvgComponent(svgIcon)}
            />
          ) : (
            <Icon
              className={classes.icon + " " + icon}
              style={{ color: color }}
            />
          )}
        </div>

        <CustomTooltip interactive title={description}>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
        </CustomTooltip>
      </CardContent>
    </Card>
  );
};

export default Skill;
