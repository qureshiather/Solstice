import * as React from "react";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box component="footer">
      <Link color="inherit" href="https://github.com/qureshiather/Solstice">
        <GitHubIcon />
      </Link>{" "}
    </Box>
  );
}
