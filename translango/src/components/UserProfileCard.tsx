import { Add, Settings } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import AppCtx, { TRANSLATION_KEYS } from "../store/app-state-context";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";

const FavouriteLanguages: React.FC<{
  fav_languages: Set<string>;
}> = ({ fav_languages }) => {
  const navigate = useNavigate();
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];
  return (
    <Stack>
      <Box>
        <Typography variant="caption">{t("FAVORITE_LANGS")}</Typography>
        <Typography variant="body1">{fav_languages.size}</Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        {[...fav_languages.values()].map((code) => {
          const language_name = ctx.availableLanguages[code];
          return (
            <Chip key={code} label={language_name} color='secondary' sx={{color: 'white'}}/>
          );
        })}
        <IconButton color="secondary" size="large" onClick={() => navigate("/select-favourite-languages")}> <Add fontSize="inherit"/></IconButton>
      </Stack>
    </Stack>
  );
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 20,
  height: 20,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const UserProfileCard: React.FC = () => {
  const ctx = useContext(AppCtx);
  const navigate = useNavigate();
  return (
    <Card sx={{bgcolor: "primary.main", color: "whitesmoke", borderRadius: 0}}>
      <CardHeader
        avatar={
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <SmallAvatar>
                <ReactCountryFlag
                  countryCode={ctx.countryCode}
                />
              </SmallAvatar>
            }
          >
            <Avatar src={ctx.profile_pic_url} aria-label="profile-pic" />
          </Badge>
        }
        action={
          <IconButton aria-label="settings" onClick={() => navigate("/select-favourite-languages")}>
            <Settings />
          </IconButton>
        }
        title={`${ctx.firstName} ${ctx.lastName}`}
        subheader={`@${ctx.username}`}
        subheaderTypographyProps={{color: "whitesmoke"}}
      />
      <CardContent>
        <FavouriteLanguages fav_languages={ctx.favouriteLanguages} />
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
