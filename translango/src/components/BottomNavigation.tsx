import {
  BottomNavigation as MUIBottomNav,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import { useEffect, useState } from "react";
import {
  AccountCircle,
  Home,
  ListAlt,
  Map,
  VideogameAsset,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserController from "../controllers/user/user.controller";

type accepted_values = "list" | "play" | "dashboard" | "mapview" | "profile";

export default function BottomNavigation() {
  const [value, setValue] = useState<accepted_values>("dashboard");
  const [auth, setAuth] = useState(false);
  const [userdata, setUserdata] = useState<null | any>(null);
  const navigate = useNavigate();

  const getData = () => {
    UserController.getUserProfile()
      .then((OpenAPIResponse) => {
        setUserdata(OpenAPIResponse.data);
        // console.log(OpenAPIResponse.data);
      })
      .catch()
      .finally();
  };

  useEffect(() => {
    getData();
    if (userdata) {
      if (userdata.id !== "") {
        setAuth(true);
      }
    }
  }, []);

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
              navigate(`/dashboard/${userdata?.id}`);
              break;
            case "play":
              navigate(`/game/${userdata?.id}`);
              break;
            case "profile":
              navigate(`/profilepage/${userdata?.id}`);
              break;
            case "mapview":
              navigate(`/profilepage/${userdata?.id}`);
              break;
            default:
              break;
          }
        }}
      >
        <BottomNavigationAction
          value="list"
          label="Languages"
          icon={<ListAlt />}
        />
        <BottomNavigationAction
          value="play"
          label="Play"
          icon={<VideogameAsset />}
        />
        <BottomNavigationAction
          value="dashboard"
          label="Home"
          icon={<Home />}
        />
        <BottomNavigationAction value="mapview" label="Map" icon={<Map />} />
        <BottomNavigationAction
          value="profile"
          label="Profile"
          icon={<AccountCircle />}
        />
      </MUIBottomNav>
    </Paper>
  );
}
