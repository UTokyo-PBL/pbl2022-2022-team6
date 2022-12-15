import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserController from '../../controllers/user/user.controller';
import { v4 as uuidv4 } from 'uuid';
import { RESPONSE_STATUS_CODES } from "../../constants/common/axios.constants";
import DashboardController from "../../controllers/dashboard/dashboard.controller";
import { Navigate, useNavigate } from 'react-router-dom';

function Copyright(props: any) {
    return (
        <Typography variant="subtitle1" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://localhost:3000">
                TranslanGo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInPage() {

    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = event.currentTarget;
        // const isValid = data.email.value !== '' && data.password.value !== '';

        const user_data = {
            email: data.email.value,
            password: data.password.value,
        };
        console.log(user_data)

        const test_data = {
            email: 'test@test10.com',
            password: 'test',
        }
        //const response = UserController.login(user_data);
        //console.log(response);

        UserController.login(test_data).then((OpenAPIResponse) => {
            // Manage the response according to OpenAPI schema
            if (OpenAPIResponse.status === 200) {
                UserController.getUserProfile().then((OpenAPIResponse) => {
                    console.log(OpenAPIResponse)
                    const uid = OpenAPIResponse.data.id;
                    navigate(`/dashboard/${uid}`, { state: { uid: uid } });
                })
            } else {
                alert('Something went wrong. Please check your details and try again');
            }
        })


    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}