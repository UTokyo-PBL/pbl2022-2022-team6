import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid, Snackbar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AppCtx, { TRANSLATION_KEYS } from "../store/app-state-context";
import { GameStep } from "../pages/quizScreen/QuizScreenPage";

interface Props {
  stepNumber: number;
  step: GameStep;
  settingScore: React.Dispatch<React.SetStateAction<number>>;
  settingAttempted: React.Dispatch<React.SetStateAction<number>>;
}

type Color =
  | "primary"
  | "inherit"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | undefined;

export const FlashCard: React.FC<Props> = ({
  stepNumber,
  step,
  settingScore,
  settingAttempted,
}) => {
  const [disabled, setDisabled] = React.useState([false, false]);
  const [colors, setColors] = React.useState<[Color, Color]>([
    "primary",
    "primary",
  ]);
  const [chosen, setChosen] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [internalScore, setInternalScore] = React.useState(0);
  const ctx = React.useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  React.useEffect(() => {
    setDisabled([false, false]);
    setColors(["primary", "primary"]);
    setChosen(false);
    setSuccessAlert(false);
    setOpen(false);
  }, [step.options]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLElement>,
    selected: number
  ) => {
    event.preventDefault();
    if (chosen) {
      return;
    }
    setChosen(true);
    const newColors: [Color, Color] = ["primary", "primary"];
    const newView = [false, false];
    if (selected === step.options.correctIndex) {
      newColors[selected] = "success";
      newView[1 - selected] = true;
      setSuccessAlert(true);
      setInternalScore(internalScore + 1);
      settingScore((oldScore) => oldScore + 1);
    } else {
      newColors[selected] = "error";
      newView[1 - selected] = true;
      setSuccessAlert(false);
    }
    setOpen(true);
    setColors(newColors);
    setDisabled(newView);
    settingAttempted(stepNumber);
    setChosen(true);
    // console.log(internalScore)
  };
  return (
    <Card>
      <CardMedia
        sx={{ width: 300, height: 300, objectFit: "contain" }}
        image={step.imageUrl}
        title="Detected object"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {t("SELECT_THE_TRANSLATION_IN") + " "}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {ctx.availableLanguages[step.target_language]}
          {/* Japanese */}
        </Typography>
        <Grid container spacing={1} direction="column" alignItems="center">
          <Grid item>
            <Button
              sx={{ width: 200, justifyContent: "left" }}
              onClick={(event) => handleSubmit(event, 0)}
              color={colors[0]}
              disabled={disabled[0]}
              variant="contained"
              startIcon={<CircleIcon />}
            >
              {step.options.text[0]}
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ width: 200, justifyContent: "left" }}
              onClick={(event) => handleSubmit(event, 1)}
              color={colors[1]}
              disabled={disabled[1]}
              variant="contained"
              startIcon={<CircleIcon />}
            >
              {step.options.text[1]}
            </Button>
          </Grid>
          <Grid item sx={{ mb: 1, width: 260 }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              {successAlert ? (
                <Alert severity="success">{t("GAME_GREAT_JOB")}</Alert>
              ) : (
                <Alert severity="error">{t("GAME_TRY_AGAIN")}</Alert>
              )}
              {/* {errorAlert ?  : null} */}
            </Snackbar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlashCard;
