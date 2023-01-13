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
import { useContext } from "react";
import React from "react";
import AppCtx, {
  AppCtxUpdater,
  defaultCtx,
  TRANSLATION_KEYS,
} from "../store/app-state-context";

function TopNavigation() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut: React.MouseEventHandler<HTMLLIElement> = () => {
    localStorage.clear();
    ctxUpdater({ ...defaultCtx });
    navigate("/");
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
              <MenuItem onClick={onLogOut}>{t("LOG_OUT")}</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default TopNavigation;
