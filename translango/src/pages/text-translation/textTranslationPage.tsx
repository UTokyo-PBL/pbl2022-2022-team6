import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import BottomNavigation from "../../components/BottomNavigation";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import TopNavigation from "../../components/TopNavigation";
import GeneralController from "../../controllers/general.controller";
import AppCtx, { TRANSLATION_KEYS } from "../../store/app-state-context";
import { TranslationResponseType } from "../../types/common/common.types";

interface TranslationProps {
  lang_code: string;
  text: string;
}

const Translation: React.FC<TranslationProps> = ({ lang_code, text }) => {
  const ctx = useContext(AppCtx);
  const [tranlationAvl, setTranslationAvl] = useState(false);
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    GeneralController.getTranslation(text, lang_code).then(
      (data: TranslationResponseType) => {
        setTranslation(data.translatedText);
        setTranslationAvl(true);
      }
    );
  }, [text]);

  return (!tranlationAvl || !text.trim()) ? (
    <></>
  ) : (
    <Card>
      <CardHeader subheader={ctx.availableLanguages[lang_code]} />
      <CardContent>
        {tranlationAvl && <Typography>{translation}</Typography>}
      </CardContent>
    </Card>
  );
};

interface OriginalTextCardProps {
  changeText: React.Dispatch<React.SetStateAction<string>>;
}
const OriginalTextCard: React.FC<OriginalTextCardProps> = ({ changeText }) => {
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];
  const [state, setState] = useState("");
  const onStateChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setState(e.target.value);
  };
  return (
    <Card>
      <CardHeader
        sx={{ color: "primary.main" }}
        title={t("WRITE_TEXT_TO_TRANSLATE")}
        subheader={t("TEXT_WILL_BE_TRANSLATED")}
      />
      <CardContent>
        <TextField
          variant="standard"
          minRows={4}
          multiline
          fullWidth
          value={state}
          onChange={onStateChange}
          onBlur={() => changeText(state)}
        />
      </CardContent>
      <CardActions>
        <Button>{t("TRANSLATE")}</Button>
      </CardActions>
    </Card>
  );
};

const TextTranslationPage: React.FC = () => {
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  const [text, setText] = useState("");

  return (
    <FillPageWithSidePic>
      <TopNavigation />
      <Stack p={2} spacing={2}>
        <OriginalTextCard changeText={setText} />
        {Array.from(ctx.favouriteLanguages).map((lang) => (
          <Translation key={lang} text={text} lang_code={lang} />
        ))}
      </Stack>
      <BottomNavigation />
    </FillPageWithSidePic>
  );
};

export default TextTranslationPage;
