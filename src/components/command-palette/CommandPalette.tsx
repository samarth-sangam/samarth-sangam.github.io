import { useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Prompt } from "components/ui/Terminal";
import type { Command } from "./commands.ts";

const LIST_ID = "command-palette-list";
const optionId = (i: number) => `command-palette-option-${i}`;

type Props = { open: boolean; onClose: () => void; commands: Command[] };

// ARIA 1.2 combobox: focus stays in the input, aria-activedescendant points at the highlighted option.
const CommandPalette = ({ open, onClose, commands }: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const pointer = useRef<{ x?: number; y?: number }>({});
  const matches = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  const close = () => {
    setQuery("");
    setActive(0);
    onClose();
  };
  const run = (command: Command | undefined) => {
    if (!command) return;
    close();
    const { href } = command;
    if (href.startsWith("/")) router.push(href);
    else if (href.startsWith("mailto:")) window.location.href = href;
    else window.open(href, "_blank", "noopener,noreferrer");
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const step = ({ ArrowDown: 1, ArrowUp: -1 } as Record<string, number>)[event.key];
    if (step) {
      event.preventDefault();
      setActive((i) => (i + step + matches.length) % Math.max(matches.length, 1));
    } else if (event.key === "Enter") {
      run(matches[active]);
    }
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm"
      slotProps={{
        paper: {
          "aria-label": "Command palette",
          sx: { alignSelf: "flex-start", mt: "15vh", border: 1, borderColor: "divider" },
        },
      }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
        <Prompt />
        <InputBase
          autoFocus
          fullWidth
          placeholder="type a command…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          slotProps={{
            input: {
              role: "combobox",
              "aria-label": "Search commands",
              "aria-expanded": true,
              "aria-controls": LIST_ID,
              "aria-autocomplete": "list",
              "aria-activedescendant": matches.length ? optionId(active) : undefined,
            },
          }}
        />
      </Box>
      <List dense id={LIST_ID} role="listbox" aria-label="Commands" sx={{ maxHeight: 360, overflow: "auto" }}>
        {matches.map((command, i) => (
          <ListItemButton
            key={command.label}
            id={optionId(i)}
            role="option"
            aria-selected={i === active}
            tabIndex={-1}
            selected={i === active}
            ref={i === active ? (el) => el?.scrollIntoView({ block: "nearest" }) : undefined}
            onClick={() => run(command)}
            onMouseMove={(e) => {
              // Chrome fires mousemove when the list scrolls under a still pointer; only real moves count.
              const { x, y } = pointer.current;
              pointer.current = { x: e.clientX, y: e.clientY };
              if (e.clientX !== x || e.clientY !== y) setActive(i);
            }}
          >
            <ListItemText primary={command.label} />
            <Typography variant="caption" sx={{ color: "text.secondary", ml: 1 }}>
              {command.hint}
            </Typography>
          </ListItemButton>
        ))}
      </List>
      <Typography role="status" sx={{ px: 2, color: "text.secondary", "&:not(:empty)": { pb: 1 } }}>
        {matches.length ? "" : `command not found: ${query}`}
      </Typography>
      <Typography aria-hidden variant="caption" sx={{ px: 2, py: 1, color: "text.secondary", borderTop: 1, borderColor: "divider" }}>
        ↑↓ navigate · ↵ run · esc close
      </Typography>
    </Dialog>
  );
};

export default CommandPalette;
