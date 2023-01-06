// import * as React from 'react';
import Button from "@mui/material/Button";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import MainIcon from "../../components/MainIcon";
import TranslanGoText from "../../components/TranslanGoText";
import CameraButton from "../../components/cameraButton";
import Copyright from "../../components/Copyright";

import TextButton from "../../components/TextButton";
import SelectLanguage from "../../components/selectLanguage";
import { useContext } from "react";
import AppCtx, { TRANSLATION_KEYS } from "../../store/app-state-context";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];
  const navigate = useNavigate();
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", bgcolor: "primary.main" }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random/?nature)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        bgcolor="primary.main"
      >
        <Box
          sx={{
            my: 3,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "primary",
          }}
        >
          <Grid container direction="row" alignItems="center" sx={{ m: 4 }}>
            <Grid item>
              <MainIcon background="primary.main" />
            </Grid>
            <Grid item>
              <TranslanGoText background="white" />
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item>
              <Typography variant="h4" color="white" fontWeight="bold">
                {t("WELCOME")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="white">
                {t("CHOOSE_TRANSLATE")}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <CameraButton background="white" />
            </Grid>
            <Grid item>
              <TextButton background="white" />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ m: 0 }}
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item>
              <Typography variant="body1" color="white">
                {t("OR")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="white">
                {t("DISCOVER_MORE_BELOW")}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ m: 1 }}
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
          >

            <Button
              fullWidth
              variant="text"
              color="primary"
              sx={{
                bgcolor: "white",
                minHeight: "40px",
                width: "280px",
                color: "primary",
                "& a:link": {
                  textDecoration: "none"
                },
                "&:hover": {
                  color: "white",
                  border: "2px solid white"
                }
                }}
                onClick={() => navigate("/signin")}
              >
                {t("SIGN_IN")}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="info"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "white",
                  minHeight: "40px",
                  width: "280px",
                  border: "2px solid",
                  "& a:link" : {textDecoration: "none"}
                }}
                onClick={() => navigate("/sign-up")}
              >
                {t("SIGN_UP")}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="info"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "white",
                  minHeight: "40px",
                  width: "280px",
                  border: "2px solid",
                  "& a:link" : {textDecoration: "none"}
                }}
                onClick={() => navigate("/dashboard")}
              >
                {t("SKIP_AND_EXPLORE")}
              </Button>
          </Grid>

          <Grid container direction="column" alignItems="center">
            <Grid item>
              <SelectLanguage />
            </Grid>
            <Grid item>
              <Copyright sx={{ mt: 1, color: "white" }} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
