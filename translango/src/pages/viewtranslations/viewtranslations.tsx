import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import ViewObject from "../../components/viewObject";
// import { DetectionWithTranslation } from '../../types/common/common.types';

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export default function ViewTranslations() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rawurl, setRawURL] = useState("");
  // const [detections, setDetections] = useState<DetectionWithTranslation>();

  useEffect(() => {
    if (!location.state) navigate("/");
    else {
      setRawURL(location.state.rawurl);
      // setDetections(location.state.detections);
    }
  }, []);

  return (
    <>
      <TopNavigation />
      <Grid container direction="column" color="primary">
        <Grid
          item
          xs={12}
          sm={9}
          md={10}
          alignItems="center"
          sx={{ m: 2, display: "flex" }}
        >
          {/* <Toolbar /> */}
          <ViewObject rawurl={rawurl} detectedObject="Dog" />
        </Grid>
        <Grid item xs={12} sm={9} md={10} alignItems="left" sx={{ m: 2 }}>
          <Typography variant="h5" color="purple" component="div">
            Your favourite languages
          </Typography>
          {/* <Toolbar /> */}
          {/* <TranslationObject rawurl={rawurl} /> */}
        </Grid>
      </Grid>
    </>
  );
}
