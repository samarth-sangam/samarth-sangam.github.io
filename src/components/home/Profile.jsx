import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "8px",
  },
}));

const Profile = ({ Icon, link, title, profileClassName, iconClassName }) => {
  const classes = useStyles();

  return (
    <Tooltip title={title}>
      <Link
        mr={2}
        href={link}
        className={profileClassName + " " + classes.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={iconClassName} />
      </Link>
    </Tooltip>
  );
};

export default Profile;
