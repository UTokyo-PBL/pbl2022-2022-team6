import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import TranslatedBox from "../../components/translatedBox";
import RoomIcon from "@mui/icons-material/Room";
import SendIcon from "@mui/icons-material/Send";
import Copyright from "../../components/Copyright";

export default function CreatePost() {
  const location = useLocation();

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "25px",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (var [key, value] of data.entries()) {
      console.log(key, value);
    }
  };

  return (
    <>
      <TopNavigation />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Grid item alignItems="center" sx={{ m: 2, maxWidth: "80%" }}>
          <Img src={location.state.rawurl} />
        </Grid>

        <Grid item alignItems="center" sx={{ m: 2, maxWidth: "80%" }}>
          <TranslatedBox
            ogtext="Dog"
            translatedtext="いぬ"
            oglanguage="EN"
            translatedlanguage="JP"
          />
        </Grid>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            m: 2,
            p: 4,
            width: "90%",
            alignSelf: "center",
            backgroundColor: "#FBE0FF",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          <TextField
            id="caption"
            label="Caption"
            multiline
            rows={4}
            placeholder="Share your thoughts here..."
            color="secondary"
            fullWidth
            sx={{ backgroundColor: "white" }}
            name="caption"
            required
          />
          <TextField
            variant="outlined"
            label="Location"
            name="location"
            id="location"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RoomIcon color="secondary" />
                </InputAdornment>
              ),
              // inputComponent: ({ inputRef, onFocus, onBlur, ...props }) => (
              //     <Autocomplete
              //         apiKey="AIzaSyCNKzmgqLSVBnT05TLmkkiBR_s9JwnM2ko"
              //         {...props}
              //         onPlaceSelected={(selected) => console.log(selected)}
              //     />)
            }}
            // inputRef={materialRef}
            color="secondary"
            placeholder="Tokyo, Japan"
            fullWidth
            sx={{ m: 1 }}
          />

          <Stack
            direction="row"
            spacing={2}
            sx={{
              m: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Button variant="outlined" onClick={() => navigate(`/previewpost/${translationID}`, { state: { ...props, rawurl: location.state.rawurl } })}>
                            Preview
                        </Button> */}
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Upload
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Copyright />
    </>
  );
}
