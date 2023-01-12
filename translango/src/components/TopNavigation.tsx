import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MainIconSolid from "./MainIconSolid";
import { Avatar, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserController from "../controllers/user/user.controller";
import React from "react";
import AppCtx, {
  AppCtxUpdater,
  defaultCtx,
  TRANSLATION_KEYS,
} from "../store/app-state-context";
import GeneralController from "../controllers/general.controller";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function TopNavigation() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  // useEffect(() => {
  //   GeneralController.getUserProfile()
  //     .then(
  //       (user) => {
  //         localStorage.setItem(
  //           "auth-token",
  //           `Bearer ${user.token.access_token_data}`
  //         );
  //         ctxUpdater(function (oldCtx) {
  //           return {
  //             ...oldCtx,
  //             isLoggedIn: true,
  //             username: user.username,
  //             email: user.email,
  //             firstName: user.firstname,
  //             lastName: user.lastname,
  //             favouriteLanguages: new Set(
  //               user.favourite_languages.map(({ code }) => code)
  //             ),
  //           };
  //         });
  //       } // then clause ends
  //     )
  //     .catch((e) => {
  //       ctxUpdater(function () {
  //         return { ...defaultCtx };
  //       });
  //     });
  // }, []);

  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon />
        </IconButton>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Photos
                    </Typography> */}
        <Stack direction="row" alignItems="center">
          <MainIconSolid darklogo={false} />
          <Typography
            variant="h5"
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Translan
            <Box sx={{ fontStyle: "italic", fontWeight: "bold" }}>Go</Box>
          </Typography>
        </Stack>

        {ctx.isLoggedIn && (
          <div style={{ float: "right" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt={ctx.username} src={ctx.profile_pic_url} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => navigate(`/profilepage/${ctx.username}`)}
              >
                {t("MY_ACCOUNT")}
              </MenuItem>
              <MenuItem onClick={handleClose}>{t("SETTINGS")}</MenuItem>
              <MenuItem>{t("LOG_OUT")}</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default TopNavigation;
