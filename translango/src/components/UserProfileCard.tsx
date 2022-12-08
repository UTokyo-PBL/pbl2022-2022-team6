import { Add, Settings } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import AppCtx from "../store/app-state-context";
import { lang_country_two_letter_codes } from "../types/common/common.types";
import ReactCountryFlag from "react-country-flag";

const FavouriteLanguages: React.FC<{
  fav_languages: lang_country_two_letter_codes[];
}> = ({ fav_languages }) => {
  return (
    <Stack>
      <Box>
        <Typography variant="caption">Favourite Languages</Typography>
        <Typography variant="body1">{fav_languages.length}</Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        {fav_languages.map((lang_and_country_code) => {
          const country_code = lang_and_country_code.substring(3);
          return (
            <Avatar sx={{border: '2px solid lightgray', bgcolor:"primary.main"}} key={lang_and_country_code}>
              <ReactCountryFlag key={lang_and_country_code} countryCode={country_code} />
            </Avatar>
          );
        })}
        <IconButton color="secondary" size="large"> <Add fontSize="inherit"/></IconButton>
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
                  countryCode={ctx.nativeLanguage!.substring(3)}
                />
              </SmallAvatar>
            }
          >
            <Avatar src={ctx.profile_pic_url} aria-label="profile-pic" />
          </Badge>
        }
        action={
          <IconButton aria-label="settings">
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
