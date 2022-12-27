import {
  AccountCircle,
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
import { useContext, useEffect, useRef, useState } from "react";
import FillPageWithSidePic from "../../../components/FillPageWithSidePic";
import SignUpAndLoginTop from "../SignUpAndLoginTop";
import {
  useLazyTranslate,
  getLanguages,
  setConfig
} from "react-google-translate";
// import ListLanguagesWithTarget from "../../../googletranslate";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import LanguageContext from "../../../components/LanguageContext";
import { useLocation } from "react-router-dom";




export default function CreateProfile(props: any) {

  const [profilePic, setProfilePic] = useState<undefined | any>();
  const [profileURL, setProfileURL] = useState('empty');
  const [uploadedimg, setUploadedimg] = useState(false);
  const fileInput = useRef<any>();

  // const value = { language, setLanguage }
  // 
  const target = useContext(LanguageContext);
  const [language, setLanguage] = useState(target.language);
  const [languageOptions, setLanguageOptions] = useState([]);

  const location = useLocation();
  //   // Imports the Google Cloud client library
  // const {Translate} = require('@google-cloud/translate').v2;

  // Creates a client
  // const translate = new Translate();

  // async function listLanguages() {
  //   // Lists available translation language with their names in English (the default).
  //   const [languages] = await translate.getLanguages();

  //   console.log('Languages:');
  //   languages.forEach(language => console.log(language));
  // }

  // listLanguages();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  // const ListLanguages
  useEffect(() => {
    // const languages = ListLanguagesWithTarget();
    console.log(language)
    console.log(target)
    // Accessing previous page state
    console.log(location.state.email)
    const response = axios
      .post(
        'https://translation.googleapis.com/language/translate/v2/languages',
        {},
        {
          params: {
            key: 'AIzaSyA9AKCuN3DSy3LYtzLjJwanD0sGjD5HI-8',
            target: 'ja',
          }
        }
      )
      .then((response) => {
        console.log(response.data.data.languages);
      })
      .catch((err) => {
        console.log('rest api error', err);
      });

  }, []);

  const changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    // event.persist();
    const file = event.target.files[0];
    setProfilePic(file);
    setProfileURL(URL.createObjectURL(file));
    setUploadedimg(true);

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
                width: { xs: "150px", sm: "300px" },
                height: { xs: "150px", sm: "300px" },
              }}
              src={profileURL}
            />
            <Box
              position="relative"
              sx={{
                bottom: { xs: "50px", sm: "90px" },
                left: { xs: "100px", sm: "220px" },
              }}
            >

              <Fab color="secondary" onClick={() => fileInput.current.click()}>
                <input hidden ref={fileInput} type="file" accept="image/*" onChange={changeImage} />
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

          <TextField
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
          />
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
            value={language}
            onChange={handleChange}
            label="Language"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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

          <Button>
            Already have an account?{" "}
            <Typography variant="subtitle2">Log in</Typography>
          </Button>
        </Stack>
      </Stack>
    </FillPageWithSidePic>
    // </LanguageContext.Provider>
  );
};
