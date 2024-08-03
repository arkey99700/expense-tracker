import {
  Badge,
  Box,
  Drawer,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "./Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppBar
        position="relative"
        component="header"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ minHeight: "75px", justifyContent: "space-between" }}>
          <IconButton onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Link to="/">
            <Typography
              component="h1"
              sx={{ fontSize: "32px", fontWeight: 700, color: "white" }}
            >
              Expense Tracker
            </Typography>
          </Link>
          <IconButton>
            <Badge badgeContent="" color="warning">
              <NotificationsIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={menuOpen} onClose={() => setMenuOpen((open) => !open)}>
        <Box
          sx={{ maxWidth: "75vw", paddingTop: "75px" }}
        >
          <Menu setMenuOpen={setMenuOpen} />
        </Box>
      </Drawer>
    </>
  );
}
