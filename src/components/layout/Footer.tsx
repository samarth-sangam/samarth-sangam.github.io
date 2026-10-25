import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = ({ name, year }: { name: string; year: number }) => (
  <Box component="footer" sx={{ py: 4, textAlign: "center", color: "text.secondary", borderTop: 1, borderColor: "divider" }}>
    <Typography variant="caption">
      © {year} {name} · press ⌘K / Ctrl+K to navigate
    </Typography>
  </Box>
);

export default Footer;
