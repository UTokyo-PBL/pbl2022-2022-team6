import { Button, CardActions, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleSwitch from "../../components/ToggleSwitch";
import TopNavigation from "../../components/TopNavigation";
import Copyright from "../../components/Copyright";
import GeneralController from "../../controllers/general.controller";
import AppCtx from "../../store/app-state-context";
import { ObjectDetectionFromImageResponseType } from "../../types/common/common.types";

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export default function PreviewImage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = useContext(AppCtx);
  const [rawurl, setRawURL] = useState("");
  const [imgObj, setImgObj] = useState(new File([], "tempfile"));
  const [toggledObject, setToggledObject] = useState(true);
  const [apiResponse, setApiResponse] =
    useState<ObjectDetectionFromImageResponseType>({
      image_name: "",
      detections: [],
    });
  const [requestSent, setRequestSent] = useState(false);
  const [detectionsReady, setDetectionsReady] = useState(false);

  /**
   * On first load check that if user has directly come to this page,
   * It means that the page does not have any state,
   * So, navigate to home page
   */
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      setRawURL(location.state.rawurl);
      setImgObj(location.state.img);
    }
  }, []);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggledObject(event.target.checked);
    // console.log(toggledObject);
  };

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    event.persist();
    const file = event.target.files[0];

    setRawURL(URL.createObjectURL(file));
    setImgObj(file);
  };

  const goScan = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (toggledObject === true) {
      setRequestSent(true);
      const data = await GeneralController.getDetectionsInImage(
        imgObj,
        Array.from(ctx.favouriteLanguages),
        ctx.nativeLanguage
      );
      setApiResponse(data);
      setDetectionsReady(true);
    } else {
      navigate("/scantext");
    }
  };

  return (
    <>
      <TopNavigation />
      <Card
        sx={{
          minWidth: "345px",
          m: 2,
          display: "block",
        }}
        component="form"
      >
        <CardHeader
          action={<ToggleSwitch name="toggleObject" onChange={handleToggle} />}
          titleTypographyProps={{ variant: "body1", align: "left" }}
          subheaderTypographyProps={{ variant: "caption", align: "left" }}
          title="Ready to Scan"
          subheader="Choose between text or object translation"
        />
        <CardMedia
          component="img"
          // height="400"
          image={rawurl}
          alt="A Photo"
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardActions sx={{ m: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="outlined"
            component="label"
            sx={{ m: 2 }}
          >
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={changeImage}
            />
            Change Picture
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={goScan}
          >
            Scan
          </Button>
        </CardActions>
      </Card>
      {requestSent && !detectionsReady && <p>Waiting for the apiResponse</p>}
      {detectionsReady &&
        apiResponse.detections.map((detectionWithTranslation) => {
          return (
            <div
              key={`${detectionWithTranslation.mid}${detectionWithTranslation.translatedName}${detectionWithTranslation.score}`}
            >
              <h1>{detectionWithTranslation.translatedName}</h1>
              {detectionWithTranslation.translations.map((trans) => {
                return (
                  <p key={trans.language}>{`${
                    ctx.availableLanguages[trans.language]
                  } => ${trans.translation}`}</p>
                );
              })}
            </div>
          );
        })}
      <Copyright sx={{ mt: 5, color: "purple" }} />
    </>
  );
}
