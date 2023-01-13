import { Grid } from "@mui/material";

import TopNavigation from "../../components/TopNavigation";
import MapComponent from "../../components/Mapcomponent";
import BottomNavigation from "../../components/BottomNavigation";

export default function ProfilePage() {
  return (
    <>
      <TopNavigation />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ maxHeight: "90vh" }}
      >
        <MapComponent />
      </Grid>

      <BottomNavigation />
    </>
  );
}
