import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const NavLink = ({ Icon, scrollToId, title }) => {
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      scrollToId
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" aria-label={title} onClick={handleClick}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default NavLink;
