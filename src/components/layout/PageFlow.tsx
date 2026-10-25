import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Prompt } from "components/ui/Terminal";
import type { NavPage } from "lib/navigation.ts";

const OVERSCROLL_PX = 200;
// Ignores trackpad momentum carried over from the previous page.
const ARM_DELAY_MS = 500;

// Paging back opens the previous page at its end, as if scrolling up into it.
let landAtBottom = false;
const atTop = (el: HTMLElement) => el.scrollTop <= 0;
const atBottom = (el: HTMLElement) => el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

// Returns -1..1: how far the user has pulled past the top (negative) or bottom (positive) edge of `el`.
const useOverscrollPaging = (el: HTMLElement | null, prev: string | undefined, next: string | undefined) => {
  const router = useRouter();
  const [pull, setPull] = useState(0);

  useEffect(() => {
    if (!el) return;
    if (landAtBottom) {
      landAtBottom = false;
      el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
    }
    if (!prev && !next) return;
    const armedAt = Date.now() + ARM_DELAY_MS;
    let overscroll = 0;
    let done = false;
    let touchY = 0;

    const push = (delta: number) => {
      if (done) return;
      const target = delta > 0 ? next : delta < 0 ? prev : undefined;
      const atEdge = delta > 0 ? atBottom(el) : atTop(el);
      if (Date.now() < armedAt || !target || !atEdge || Math.sign(delta) !== Math.sign(overscroll || delta)) {
        overscroll = 0;
      } else {
        overscroll += delta;
      }
      setPull(Math.max(-1, Math.min(1, overscroll / OVERSCROLL_PX)));
      if (target && Math.abs(overscroll) >= OVERSCROLL_PX) {
        done = true;
        landAtBottom = delta < 0;
        router.push(target, { scroll: false });
      }
    };
    const onWheel = (e: WheelEvent) => !e.ctrlKey && push(e.deltaY);
    const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0]?.clientY ?? 0);
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY;
      push(touchY - y);
      touchY = y;
    };
    const onTouchEnd = () => push(0);

    addEventListener("wheel", onWheel, { passive: true });
    addEventListener("touchstart", onTouchStart, { passive: true });
    addEventListener("touchmove", onTouchMove, { passive: true });
    addEventListener("touchend", onTouchEnd);
    return () => {
      removeEventListener("wheel", onWheel);
      removeEventListener("touchstart", onTouchStart);
      removeEventListener("touchmove", onTouchMove);
      removeEventListener("touchend", onTouchEnd);
    };
  }, [el, prev, next, router]);

  return pull;
};

const Fill = ({ amount }: { amount: number }) => (
  <Box aria-hidden sx={{ position: "absolute", inset: 0, width: `${amount * 100}%`, bgcolor: "action.selected" }} />
);

const PageBar = ({ page, label, hint, up, pull }: { page: NavPage; label: string; hint: string; up?: boolean; pull: number }) => {
  const Arrow = up ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;
  return (
    <Box component="nav" aria-label={label} sx={{ flex: "none", px: 2, py: 0.75 }}>
      <Box
        component={Link}
        href={page.href}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 1,
          maxWidth: "lg",
          mx: "auto",
          px: 2,
          py: 0.75,
          overflow: "hidden",
          border: 1,
          borderColor: pull > 0 ? "primary.main" : "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
          color: "text.secondary",
          fontSize: "0.875rem",
          textDecoration: "none",
          "&:hover": { borderColor: "primary.main", color: "text.primary" },
        }}
      >
        <Fill amount={pull} />
        <Box component="span" sx={{ position: "relative", flex: 1 }}>
          <Prompt /> cd ~/{page.href === "/" ? "" : page.label}
        </Box>
        <Box component="span" aria-hidden sx={{ position: "relative", display: { xs: "none", sm: "inline" } }}>
          {hint}
        </Box>
        <Arrow aria-hidden fontSize="small" sx={{ position: "relative" }} />
      </Box>
    </Box>
  );
};

// The scrolling page body, framed by always-visible links to the neighbouring pages.
// Scroll past the bottom for the next page, past the top for the previous one.
const PageFlow = ({ prev, next, children }: { prev?: NavPage; next?: NavPage; children: ReactNode }) => {
  const [main, setMain] = useState<HTMLElement | null>(null);
  const pull = useOverscrollPaging(main, prev?.href, next?.href);
  const scrolled = useScrollTrigger({ target: main ?? undefined, disableHysteresis: true, threshold: 100 });

  return (
    <>
      {prev && <PageBar page={prev} label="Previous page" hint="scroll up" up pull={Math.max(-pull, 0)} />}
      <Box
        component="main"
        id="main"
        ref={setMain}
        tabIndex={0}
        sx={{ flex: 1, minHeight: 0, overflowY: "auto", overscrollBehaviorY: "contain", display: "flex", flexDirection: "column" }}
      >
        {/* Auto margins centre short pages without clipping the top of tall ones. */}
        <Box sx={{ my: "auto" }}>{children}</Box>
      </Box>
      {next && <PageBar page={next} label="Next page" hint="keep scrolling" pull={Math.max(pull, 0)} />}
      <Zoom in={scrolled}>
        <Fab
          color="primary"
          size="small"
          aria-label="Scroll back to top"
          onClick={() => main?.scrollTo({ top: 0 })}
          sx={{ position: "fixed", bottom: 64, right: 16 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default PageFlow;
