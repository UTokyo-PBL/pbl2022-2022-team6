import {
  Card,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import BottomNavigation from "../../components/BottomNavigation";
import CameraButton from "../../components/cameraButton";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import MapComponent from "../../components/Mapcomponent";
import TextButton from "../../components/TextButton";
import UserProfileCard from "../../components/UserProfileCard";
import AppCtx, { TRANSLATION_KEYS } from "../../store/app-state-context";

const Dashboard: React.FC = () => {
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) => ctx.translations[ctx.nativeLanguage] ? ctx.translations[ctx.nativeLanguage][key] : ctx.translations['en'][key];
  return (
    <FillPageWithSidePic>
      <Stack>
        <UserProfileCard />
        <Card sx={{ bgcolor: "primary.light", color: "primary.main" }}>
          <CardHeader
            color="white"
            title={t("TRANSLATE_ON_THE_GO")}
            subheader={t("CHOOSE_TRANSLATE")}
            subheaderTypographyProps={{ color: "primary.main" }}
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
                  {t("CHOOSE_TEXT_OR_OBJECT_DETECTION")}
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
          <MapComponent />
        </Card>
        <BottomNavigation />
      </Stack>
    </FillPageWithSidePic>
  );
};

export default Dashboard;
