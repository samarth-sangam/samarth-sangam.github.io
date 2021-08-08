//Libraries
import React from "react";
import PropTypes from "prop-types";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";

//icons
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import BuildIcon from "@material-ui/icons/Build";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import WorkIcon from "@material-ui/icons/Work";
import AssignmentIcon from "@material-ui/icons/Assignment";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

//components
import ScrollTop from "components/header/ScrollTop";
import NavLink from "components/header/NavLink";

const useStyles = makeStyles((theme) => ({
  grow: {
    [theme.breakpoints.up("sm")]: {
      flexGrow: 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-end",
    },
  },
  appBar: {
    height: "max-content",
  },
}));

const sectionLinks = [
  {
    title: "Home",
    Icon: HomeIcon,
    scrollToId: "#back-to-top-anchor",
  },
  {
    title: "Skills",
    Icon: BuildIcon,
    scrollToId: "#to-skills-anchor",
  },
  {
    title: "Experience",
    Icon: WorkIcon,
    scrollToId: "#to-experience-anchor",
  },
  {
    title: "Blog posts",
    Icon: AssignmentIcon,
    scrollToId: "#to-post-anchor",
  },
  {
    title: "Contact",
    Icon: ContactMailIcon,
    scrollToId: "#to-contact-anchor",
  },
];

const Header = (props) => {
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderDesktopSectionLink = sectionLinks.map((sectionLink) => (
    <NavLink key={sectionLink.title} {...sectionLink} />
  ));
  const renderMobileSectionLink = sectionLinks.map((sectionLink) => (
    <MenuItem key={sectionLink.title}>
      <NavLink {...sectionLink} />
      <p>{sectionLink.title}</p>
    </MenuItem>
  ));

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {renderMobileSectionLink}
    </Menu>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <div className={classes.sectionDesktop}>
            {renderDesktopSectionLink}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Toolbar id="back-to-top-anchor" className="anchor" />
      <ScrollTop {...props} scrollToId="#back-to-top-anchor">
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
