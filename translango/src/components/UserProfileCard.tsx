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
import AppCtx from "../store/app-state-context";
import { ISO639_1LanguageCodeType } from "../types/common/common.types";
import ReactCountryFlag from "react-country-flag";
import { LanguageCode2Name } from "../store/utils";
import { useNavigate } from "react-router-dom";

const FavouriteLanguages: React.FC<{
  fav_languages: Set<ISO639_1LanguageCodeType>;
}> = ({ fav_languages }) => {
  const navigate = useNavigate();
  return (
    <Stack>
      <Box>
        <Typography variant="caption">Favourite Languages</Typography>
        <Typography variant="body1">{fav_languages.size}</Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        {[...fav_languages.values()].map((iso639_1language_code) => {
          const language_name = LanguageCode2Name[iso639_1language_code];
          return (
            <Chip key={iso639_1language_code} label={language_name} color='secondary' sx={{color: 'white'}}/>
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