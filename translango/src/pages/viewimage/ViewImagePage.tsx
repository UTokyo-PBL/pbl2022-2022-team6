import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { Card, CardMedia } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleSwitch from "../../components/ToggleSwitch";
import TopNavigation from "../../components/TopNavigation";
import Copyright from "../../components/Copyright";
import GeneralController from "../../controllers/general.controller";
import AppCtx, { TRANSLATION_KEYS } from "../../store/app-state-context";
import { ObjectDetectionFromImageResponseType } from "../../types/common/common.types";

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export default function PreviewImage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = useContext(AppCtx);
  const [rawurl, setRawURL] = useState("");
  const [imgObj, setImgObj] = useState(new File([], "tempfile"));
  const [toggledObject, setToggledObject] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] =
    useState<ObjectDetectionFromImageResponseType>({
      image_name: "",
      detections: [],
    });
  const [detectionsReady, setDetectionsReady] = useState(false);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];
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
  };

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    event.persist();
    const file = event.target.files[0];

    setRawURL(URL.createObjectURL(file));
    setImgObj(file);
    setDetectionsReady(false);
  };

  const goScan = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (toggledObject === true) {
      setIsLoading(true);
      const data = await GeneralController.getDetectionsInImage(
        imgObj,
        Array.from(ctx.favouriteLanguages),
        ctx.nativeLanguage
      );
      setApiResponse(data);
      setIsLoading(false);
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
          title={t("READY_TO_SCAN")}
          subheader={t("CHOOSE_TEXT_OR_OBJECT_DETECTION")}
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
            {t("CHANGE_PICTURE")}
          </Button>
          <LoadingButton
            size="small"
            color="secondary"
            variant="contained"
            loading={isLoading}
            onClick={goScan}
          >
            {t("SCAN")}
          </LoadingButton>
        </CardActions>
      </Card>
      {detectionsReady &&
        apiResponse.detections.map((detectionWithTranslation) => {
          return (
            <Card
              sx={{
                m: 2,
              }}
              key={`${detectionWithTranslation.mid}${detectionWithTranslation.translatedName}${detectionWithTranslation.score}`}
            >
              <CardHeader title={detectionWithTranslation.translatedName} />
              <CardContent>
                <List
                  component={Stack}
                  direction="row"
                  overflow="auto"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  {detectionWithTranslation.translations.map((trans) => {
                    return (
                      <ListItem key={trans.language}>
                        <ListItemText
                          primary={trans.translation}
                          secondary={ctx.availableLanguages[trans.language]}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          );
        })}
      <Copyright sx={{ mt: 5, color: "purple" }} />
    </>
  );
}
