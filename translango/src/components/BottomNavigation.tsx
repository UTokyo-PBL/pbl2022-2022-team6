import {
  BottomNavigation as MUIBottomNav,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import { useContext, useState } from "react";
import {
  AccountCircle,
  Home,
  ListAlt,
  Map,
  VideogameAsset,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppCtx, {
  AppCtxUpdater,
  TRANSLATION_KEYS,
} from "../store/app-state-context";

type accepted_values = "list" | "play" | "dashboard" | "mapview" | "profile";

export default function BottomNavigation() {
  const [value, setValue] = useState<accepted_values>("dashboard");
  const navigate = useNavigate();
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

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
            case "list":
              navigate("/select-favourite-languages");
              break;
            case "dashboard":
              navigate(`/dashboard/${ctx.username}`);
              break;
            case "play":
              navigate(`/game/${ctx.username}`);
              break;
            case "profile":
              navigate(`/profilepage/${ctx.username}`);
              break;
            case "mapview":
              navigate(`/profilepage/${ctx.username}`);
              break;
            default:
              break;
          }
        }}
      >
        <BottomNavigationAction
          value="list"
          label={t("LANGUAGES")}
          icon={<ListAlt />}
        />
        <BottomNavigationAction
          value="play"
          label={t("PLAY")}
          icon={<VideogameAsset />}
        />
        <BottomNavigationAction
          value="dashboard"
          label={t("HOME")}
          icon={<Home />}
        />
        <BottomNavigationAction value="mapview" label="Map" icon={<Map />} />
        <BottomNavigationAction
          value="profile"
          label={t("PROFILE")}
          icon={<AccountCircle />}
        />
      </MUIBottomNav>
    </Paper>
  );
}
