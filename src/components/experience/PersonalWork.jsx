import React from "react";

//Material UI Components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import LinkIcon from "@material-ui/icons/Link";

//Component
import Stacks from "components/experience/Stacks";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    textAlign: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    marginBottom: 0,
  },
  header: {
    textOverflow: "wrap",
    overflowWrap: "break-word",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  content: {
    minHeight: 100,
    padding: "0 8px !important",
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: "100%",
    wordWrap: "break-word",
    textAlign: "center",
    fontStyle: "italic",
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

const PersonalWork = ({
  title,
  details,
  stacks,
  applicationLink,
  githubLink,
}) => {
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
        subheaderTypographyProps={{ className: classes.subHeader }}
        subheader={
          <CustomTooltip interactive title={details} component="span">
            <Typography
              className={classes.details}
              gutterBottom
              variant="subtitle2"
            >
              {details}
            </Typography>
          </CustomTooltip>
        }
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <Stacks stacks={stacks} />
        <CardActions className={classes.cardActions}>
          <CustomTooltip interactive title="Link to Github project">
            <Link
              component={IconButton}
              color="inherit"
              mr={2}
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </Link>
          </CustomTooltip>
          {applicationLink && (
            <CustomTooltip interactive title="Link to application">
              <Link
                component={IconButton}
                color="inherit"
                mr={2}
                href={applicationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon />
              </Link>
            </CustomTooltip>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PersonalWork;
