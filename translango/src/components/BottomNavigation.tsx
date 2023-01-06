import {
  BottomNavigation as MUIBottomNav,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import { useState } from "react";
import {
  AccountCircle,
  Home,
  ListAlt,
  Map,
  VideogameAsset,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type accepted_values = "list" | "play" | "dashboard" | "mapview" | "profile";

export default function BottomNavigation() {
  const [value, setValue] = useState<accepted_values>("dashboard");
  const navigate = useNavigate();
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <MUIBottomNav
        // showLabels
        value={value}
        onChange={(_event, newValue: accepted_values) => {
          setValue(newValue);
          switch (newValue) {
            case "list": break;
            case "dashboard": navigate("/dashboard"); break;
            case "play": navigate("/dashboard"); break;
            case "profile": navigate("/profilepage"); break;
            case "mapview": navigate("/dashboard"); break;
            default:
              break;
          }
        }}
      >
        <BottomNavigationAction value="list" label="List" icon={<ListAlt />}/>
        <BottomNavigationAction value="play" label="Play" icon={<VideogameAsset />} />
        <BottomNavigationAction value="dashboard" label="Home" icon={<Home />} />
        <BottomNavigationAction value="mapview" label="Map" icon={<Map />} />
        <BottomNavigationAction value="profile" label="Profile" icon={<AccountCircle />} />
      </MUIBottomNav>
    </Paper>
  );
}
