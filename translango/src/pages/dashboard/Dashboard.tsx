import {
  Card,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import BottomNavigation from "../../components/BottomNavigation";
import CameraButton from "../../components/cameraButton";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import TextButton from "../../components/TextButton";
import UserProfileCard from "../../components/UserProfileCard";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
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
                  {t("Welcome")}
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
