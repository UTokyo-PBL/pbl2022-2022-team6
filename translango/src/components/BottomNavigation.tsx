import { styled, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import theme from "../theme/theme";
import {
  BottomNavigation as MUIBottomNav,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import { BottomNavigationActionTypeMap } from "@mui/material/BottomNavigationAction"
import React, { useState } from "react";
import {
  AccountCircle,
  Home,
  ListAlt,
  Map,
  VideogameAsset,
} from "@mui/icons-material";

type accepted_values = "list" | "play" | "dashboard" | "mapview" | "profile";

export default function BottomNavigation() {
  const [value, setValue] = useState<accepted_values>("dashboard");
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <MUIBottomNav
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction value="list" label="List" icon={<ListAlt />} />
        <BottomNavigationAction value="play" label="Play" icon={<VideogameAsset />} />
        <BottomNavigationAction value="dashboard" label="Home" icon={<Home />} />
        <BottomNavigationAction value="mapview" label="Map" icon={<Map />} />
        <BottomNavigationAction value="profile" label="Profile" icon={<AccountCircle />} />
      </MUIBottomNav>
    </Paper>
  );
}
