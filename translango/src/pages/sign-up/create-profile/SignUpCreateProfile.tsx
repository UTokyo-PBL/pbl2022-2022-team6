import {
  // AccountCircle,
  Add,
  Google,
  Language,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Box,
  Checkbox,
  Divider,
  Fab,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import FillPageWithSidePic from "../../../components/FillPageWithSidePic";
import SignUpAndLoginTop from "../SignUpAndLoginTop";
// import ListLanguagesWithTarget from "../../../googletranslate";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AppCtx, { AppCtxUpdater } from "../../../store/app-state-context";
import { uiLanguages } from "../../../components/selectLanguage";

export default function CreateProfile() {
  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);

  const [_profilePic, setProfilePic] = useState<undefined | File>();
  const [profileURL, setProfileURL] = useState("empty");
  // const [uploadedimg, setUploadedimg] = useState(false);
  const fileInput = useRef<any>();


  // const location = useLocation();

  const handleChange = (event: SelectChangeEvent) => {
    // setLanguage(event.target.value);
    ctx.nativeLanguage = event.target.value;
    ctxUpdater({ ...ctx });
  };

  const changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    // event.persist();
    const file = event.target.files[0];
    setProfilePic(file);
    setProfileURL(URL.createObjectURL(file));
    // setUploadedimg(true);

    // this.setState({ img: file, rawurl: URL.createObjectURL(file), uploadedimg: true });

    // await new Promise<void>((resolve, reject) => {
    //     console.log('async', this.state.rawurl)
    //     resolve();
    // })
    // console.log(this.state.rawurl)
  };

  return (
    // <LanguageContext.Provider value={value}>
    <FillPageWithSidePic>
      <Stack>
        <SignUpAndLoginTop
          backTo="/sign-up/confirm-email"
          title="Let's Set Up"
          subtitle="Create your profile here"
        />

        <Stack component="form" p={4} spacing={2}>
          <Box marginX={"auto"}>
            <Avatar
              sx={{
                width: { xs: "100px", sm: "200px" },
                height: { xs: "100px", sm: "200px" },
              }}
              src={profileURL}
            />
            <Box
              position="relative"
              sx={{
                bottom: { xs: "50px", sm: "50px" },
                left: { xs: "50px", sm: "150px" },
              }}
            >
              <Fab color="secondary" onClick={() => fileInput.current.click()}>
                <input
                  hidden
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  onChange={changeImage}
                />
                <Add />
              </Fab>
            </Box>
          </Box>

          <TextField
            fullWidth
            variant="standard"
            placeholder="Full Name"
            name="name"
            id="name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            variant="standard"
            placeholder="username"
            name="username"
            id="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="h6" mr={1}>
                    @
                  </Typography>
                </InputAdornment>
              ),
            }}
          />

          {/* <TextField
            fullWidth
            variant="standard"
            placeholder="Language"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Language />
                </InputAdornment>
              ),
            }}
          /> */}
          {/* <Select
            fullWidth
            variant="standard"
            placeholder="Language"
            defaultValue={{ label: "Chinese", value: "zh-CN" }}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <Language />
            //     </InputAdornment>
            //   ),
            // }}
            options={languageOptions}
            onChange={(param: any) => {
              setLanguage(param.value);
            }}
          /> */}

          <Select
            id="languages"
            name="languages"
            value={ctx.nativeLanguage}
            onChange={handleChange}
            label="Language"
            sx={{
              color: 'grey'
            }}
          >
            {
              /* <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */

              uiLanguages.map(({ value, text }) => {
                return <MenuItem key={value} value={value}>{text}</MenuItem>;
              })
            }
          </Select>

          <FormControlLabel
            sx={{ width: "100%" }}
            control={<Checkbox defaultChecked />}
            label="Keep me signed in"
          />

          <FormControlLabel
            sx={{ width: "100%" }}
            control={<Checkbox defaultChecked />}
            label="Email me about special pricing and more"
          />

          <Button variant="contained" fullWidth>
            Create Account
          </Button>

          <Divider>Or sign in with</Divider>

          <Button startIcon={<Google />}>Google</Button>

          {/* <Button>
            Already have an account?{"  "}
            <Typography variant="subtitle2">Log in</Typography>
          </Button> */}
          <Button href='/signin'>
            Already have an account? Log In
          </Button>
        </Stack>
      </Stack>
    </FillPageWithSidePic>
    // </LanguageContext.Provider>
  );
}
