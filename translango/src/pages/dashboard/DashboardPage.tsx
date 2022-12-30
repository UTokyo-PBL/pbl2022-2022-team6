import {
  Card,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import BottomNavigation from "../../components/BottomNavigation";
import CameraButton from "../../components/cameraButton";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import TextButton from "../../components/TextButton";
import UserProfileCard from "../../components/UserProfileCard";
import AppCtx, { AppCtxUpdater, TRANSLATION_KEYS } from "../../store/app-state-context";

const Dashboard: React.FC = () => {
  const ctx = useContext(AppCtx);
    const ctxUpdater = useContext(AppCtxUpdater);
    const t = (key: TRANSLATION_KEYS) => ctx.translations[ctx.nativeLanguage] ? ctx.translations[ctx.nativeLanguage][key] : ctx.translations['en'][key];
  return (
    <FillPageWithSidePic>
      <Stack>
        <UserProfileCard />
        <Card sx={{ bgcolor: "primary.light", color: "primary.main" }}>
          <CardHeader
            color="white"
            title="Translate on the go"
            subheader="Choose how you'd like to translate"
            subheaderTypographyProps={{color: "primary.main"}}
          >
            <Grid
              container
              direction="column"
              alignItems="right"
              justifyContent="flex-end"
            >
              <Grid item>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {t("WELCOME")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="white">
                  Choose how you'd like to translate
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
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
        </Card>
        <BottomNavigation />
      </Stack>
    </FillPageWithSidePic>
  );
};

export default Dashboard;
