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
  } from "@mui/material";
  import SignUpAndLoginTop from "../SignUpAndLoginTop";
  
  const CreateProfile: React.FC = () => {
    return (
      <Stack>
        <SignUpAndLoginTop
          backTo="/sign-up/confirm-email"
          title="Let's Set Up"
          subtitle="Create your profile here"
        />
  
        <Stack component="form" p={4} spacing={2}>
          <Box marginX={'auto'}>
            <Avatar
              sx={{
                  
                width: { xs: "150px", sm: "300px" },
                height: { xs: "150px", sm: "300px" },
              }}
            >
              <AccountCircle
                color="primary"
                sx={{
                  width: { xs: "150px", sm: "300px" },
                  height: { xs: "150px", sm: "300px" },
                }}
              />
            </Avatar>
            <Box
              position="relative"
              sx={{
                bottom: { xs: "50px", sm: "90px" },
                left: { xs: "100px", sm: "220px" },
              }}
            >
              <Fab color="secondary">
                <Add />
              </Fab>
              {/* <Chip label="+" color="secondary" onClick={() => {}} /> */}
            </Box>
          </Box>
  
          <TextField
            fullWidth
            variant="standard"
            placeholder="Full Name"
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
    );
  };
  
  export default CreateProfile;
  