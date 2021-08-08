// import React from "react";
// import Tooltip from "@material-ui/core/Tooltip";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/Styles";

// const useStyles = makeStyles((theme) => ({
//   link: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: theme.spacing(2),
//   },
// }));

// const NavLink = ({ Icon, scrollToId, title }) => {
//   const classes = useStyles();
//   return (
//     <Tooltip title={title}>
//       <Link color="inherit" mr={2} href={scrollToId} className={classes.link}>
//         <Icon />
//       </Link>
//     </Tooltip>
//   );
// };

// export default NavLink;

import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const NavLink = ({ Icon, scrollToId, title }) => {
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      scrollToId
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
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
