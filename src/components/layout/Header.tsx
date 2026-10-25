import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { isCurrent, type NavPage } from "lib/navigation.ts";

type HeaderProps = { user: string; pages: NavPage[]; onOpenPalette: () => void };

const Header = ({ user, pages, onOpenPalette }: HeaderProps) => {
  const pathname = usePathname();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  const { mode, systemMode, setMode } = useColorScheme();
  const dark = (mode === "system" ? systemMode : mode) !== "light";

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          bgcolor: (t) => (scrolled ? t.alpha((t.vars ?? t).palette.background.default, .8) : "transparent"),
          color: "text.primary",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: 1,
          borderColor: scrolled ? "divider" : "transparent",
          transition: "background-color .3s, border-color .3s",
        }}
      >
        <Toolbar variant="dense" sx={{ gap: 1 }}>
          <Button component={Link} href="/" color="primary" sx={{ textTransform: "none", fontWeight: 700, mr: "auto" }}>
            ~/{user}
          </Button>
          <Box component="nav" aria-label="Pages" sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map(({ href, label }) => {
              const current = isCurrent(pathname, href);
              return (
                <Button
                  key={href}
                  component={Link}
                  href={href}
                  aria-current={current ? "page" : undefined}
                  color={current ? "primary" : "inherit"}
                  sx={{ textTransform: "none" }}
                >
                  ./{label}
                </Button>
              );
            })}
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            aria-keyshortcuts="Meta+K Control+K"
            aria-haspopup="dialog"
            sx={{ textTransform: "none", minWidth: 0 }}
          >
            ⌘K
          </Button>
          <IconButton
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            onClick={() => setMode(dark ? "light" : "dark")}
            color="inherit"
          >
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            aria-label="Open page menu"
            aria-controls="mobile-pages"
            aria-haspopup="true"
            aria-expanded={Boolean(menuAnchor)}
            onClick={(event) => setMenuAnchor(event.currentTarget)}
            color="inherit"
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="mobile-pages"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {pages.map(({ href, label }) => (
          <MenuItem
            key={href}
            component={Link}
            href={href}
            selected={isCurrent(pathname, href)}
            aria-current={isCurrent(pathname, href) ? "page" : undefined}
            onClick={() => setMenuAnchor(null)}
          >
            cd ~/{label}
          </MenuItem>
        ))}
      </Menu>
      <Zoom in={scrolled}>
        <Fab
          color="primary"
          size="small"
          href="#main"
          aria-label="Scroll back to top"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default Header;
