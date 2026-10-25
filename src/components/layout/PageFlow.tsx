import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Prompt } from "components/ui/Terminal";
import type { NavPage } from "lib/navigation.ts";

const OVERSCROLL_PX = 200;
// Ignores trackpad momentum carried over from the previous page.
const ARM_DELAY_MS = 500;

// Where the incoming page should open: top when paging forward, end when paging back.
let landAt: "top" | "bottom" | undefined;
const atTop = () => scrollY <= 0;
const atBottom = () => innerHeight + scrollY >= document.documentElement.scrollHeight - 2;

// Returns -1..1: how far the user has pulled past the top (negative) or bottom (positive) edge.
const useOverscrollPaging = (prev: string | undefined, next: string | undefined) => {
  const router = useRouter();
  const [pull, setPull] = useState(0);

  useEffect(() => {
    if (landAt) {
      // Instant both ways; Next's own scroll-to-top would be smooth (html has scroll-behavior: smooth).
      scrollTo({ top: landAt === "top" ? 0 : document.documentElement.scrollHeight, behavior: "instant" });
      landAt = undefined;
    }
    if (!prev && !next) return;
    const armedAt = Date.now() + ARM_DELAY_MS;
    let overscroll = 0;
    let done = false;
    let touchY = 0;

    const push = (delta: number) => {
      if (done) return;
      const target = delta > 0 ? next : delta < 0 ? prev : undefined;
      const atEdge = delta > 0 ? atBottom() : atTop();
      if (Date.now() < armedAt || !target || !atEdge || Math.sign(delta) !== Math.sign(overscroll || delta)) {
        overscroll = 0;
      } else {
        overscroll += delta;
      }
      setPull(Math.max(-1, Math.min(1, overscroll / OVERSCROLL_PX)));
      if (target && Math.abs(overscroll) >= OVERSCROLL_PX) {
        done = true;
        landAt = delta > 0 ? "top" : "bottom";
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
  }, [prev, next, router]);

  return pull;
};

const Fill = ({ amount }: { amount: number }) => (
  <Box aria-hidden sx={{ position: "absolute", inset: 0, width: `${amount * 100}%`, bgcolor: "action.selected" }} />
);

// Scroll past the bottom for the next page, past the top for the previous one.
const PageFlow = ({ prev, next }: { prev?: NavPage; next?: NavPage }) => {
  const pull = useOverscrollPaging(prev?.href, next?.href);

  return (
    <>
      {prev && pull < 0 && (
        // Transient hint only; the header nav is the accessible route back.
        <Box
          aria-hidden
          sx={{
            position: "fixed",
            top: 56,
            left: "50%",
            translate: "-50% 0",
            zIndex: "appBar",
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.75,
            overflow: "hidden",
            border: 1,
            borderColor: "primary.main",
            borderRadius: 2,
            bgcolor: "background.paper",
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          <Fill amount={-pull} />
          <KeyboardArrowUpIcon sx={{ position: "relative" }} />
          <Box component="span" sx={{ position: "relative" }}>
            cd ~/{prev.href === "/" ? "" : prev.label}
          </Box>
        </Box>
      )}
      {next && (
        <Container component="nav" aria-label="Next page" maxWidth="lg" sx={{ pb: 6 }}>
          <Box
            component={Link}
            href={next.href}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1.5,
              overflow: "hidden",
              border: 1,
              borderColor: pull > 0 ? "primary.main" : "divider",
              borderRadius: 2,
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { borderColor: "primary.main", color: "text.primary" },
            }}
          >
            <Fill amount={Math.max(pull, 0)} />
            <Box component="span" sx={{ position: "relative", flex: 1 }}>
              <Prompt /> cd ~/{next.label}
            </Box>
            <Box component="span" aria-hidden sx={{ position: "relative", display: { xs: "none", sm: "inline" } }}>
              keep scrolling
            </Box>
            <KeyboardArrowDownIcon aria-hidden sx={{ position: "relative" }} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default PageFlow;
