import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation";
import AppCtx, { TRANSLATION_KEYS } from "../../store/app-state-context";
import { useContext } from "react";

export default function GameScreen() {
  const navigate = useNavigate();
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  return (
    <>
      <TopNavigation />
      <Grid
        container
        component="main"
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={6}
        sx={{ height: "100vh", bgcolor: "primary.light" }}
      >
        <Grid item>
          <IconButton
            onClick={() => {
              navigate(`/practice`);
            }}
          >
            <Avatar
              sx={{
                width: 160,
                height: 160,
                backgroundImage:
                  "url(https://source.unsplash.com/random/?purple,dark)",
              }}
            >
              <Typography fontWeight="bold" variant="h4">
                {t("PRACTICE")}
              </Typography>
            </Avatar>
          </IconButton>
        </Grid>
        <Grid item alignContent="center">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary.main"
          >
            {t("LANGUAGE_QUIZ")}
          </Typography>
          <Typography variant="h6" align="center" color="primary.main">
            {t("QUIZ_TEXT")}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              navigate(`/quiz`);
            }}
          >
            <Avatar
              sx={{
                width: 160,
                height: 160,
                backgroundImage:
                  "url(https://source.unsplash.com/random/?pink,sky)",
              }}
            >
              <Typography fontWeight="bold" variant="h4">
                {t("QUIZ")}
              </Typography>
            </Avatar>
          </IconButton>
        </Grid>
        <BottomNavigation />
      </Grid>
    </>
  );
}
