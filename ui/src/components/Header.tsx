import {
  Badge,
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "./Menu";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Box
        component="header"
        sx={{
          height: "75px",
          padding: "0 25px",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography
          component="h1"
          sx={{ fontSize: "32px", fontWeight: 700, color: "white" }}>
          Expense Tracker
        </Typography>
        <IconButton>
          <Badge badgeContent="" color="warning">
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Box>
      <Drawer open={menuOpen} onClose={() => setMenuOpen((open) => !open)}>
        <Box sx={{ width: "75vw" }}>
          <Box sx={{ padding: "17px" }}>
            <IconButton onClick={() => setMenuOpen((open) => !open)}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <Divider />
          <Menu />
        </Box>
      </Drawer>
    </>
  );
}
