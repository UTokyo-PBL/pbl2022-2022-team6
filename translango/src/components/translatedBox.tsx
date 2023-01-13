import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Avatar, Paper } from "@mui/material";

export default function TranslatedBox(props: any) {
  return (
    <>
      <Grid
        container
        gap={6}
        component={Paper}
        direction="row"
        borderRadius={25}
        display="flex"
        alignItems="center"
        wrap="nowrap"
        color="primary"
      >
        <Grid item xs={8} sx={{ m: 1 }}>
          <Chip
            avatar={<Avatar>{props.oglanguage}</Avatar>}
            label={props.ogtext}
            color="primary"
          />
        </Grid>
        <AutorenewIcon color="success" fontSize="small" />
        <Grid item xs={8} sx={{ m: 1 }}>
          <Chip
            avatar={<Avatar>{props.translatedlanguage}</Avatar>}
            label={props.translatedtext}
            color="primary"
          />
        </Grid>
      </Grid>
    </>
  );
}
