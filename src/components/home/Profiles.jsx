import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import Icon from "@material-ui/core/Icon";

//Components
import Profile from "components/home/Profile";

const useStyles = makeStyles((theme) => ({
  profiles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Profiles = () => {
  const classes = useStyles();
  return (
    <div className={classes.profiles}>
      <Profile
        Icon={LinkedInIcon}
        link="https://www.linkedin.com/in/samarth-s-sangam/"
        profileClassName="profile-icon linkedIn"
        title="LinkedIn Profile"
      />
      <Profile
        Icon={GitHubIcon}
        link="https://github.com/samarth-sangam"
        profileClassName="profile-icon github"
        title="Github Profile"
      />
      <Profile
        Icon={Icon}
        link="https://medium.com/@samarthsangam1"
        profileClassName="profile-icon medium"
        iconClassName="fab fa-medium"
        title="Medium Profile"
      />
    </div>
  );
};

export default Profiles;
