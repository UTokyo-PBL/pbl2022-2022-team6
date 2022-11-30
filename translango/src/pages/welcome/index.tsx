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
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { Image, Widgets } from '@mui/icons-material';

// Images
import TranslanGoIcon from '../../assets/TranslanGoIcon.svg';
import TranslanGo from '../../assets/TranslanGo.svg';
import { Icon, SvgIcon } from '@mui/material';

// Components
import MainIcon from '../../components/MainIcon';
import TranslanGoText from '../../components/TranslanGoText';
import CameraButton from '../../components/cameraButton';

// theme
import theme from '../../theme/theme';
import TextButton from '../../components/TextButton';

function Copyright(props: any) {
    return (
        <Typography variant="subtitle1" color="white" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://localhost:3000">
                TranslanGo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function WelcomePage() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', bgcolor: 'primary.main' }}>
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
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} bgcolor='primary.main' square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'primary'
                        }}
                    >
                        <Grid container direction="row" alignItems="center" sx={{ m: 6 }}>
                            <Grid item>
                                <MainIcon background='primary.main' />
                            </Grid>
                            <Grid item>
                                <TranslanGoText background='white' />
                            </Grid>
                        </Grid>
                        <Grid container direction="column" alignItems="right" justifyContent="flex-end">
                            <Grid item>
                                <Typography variant='h4' color='white' fontWeight='bold'>
                                    Translate on the Go!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' color='white'>
                                    Choose how you’d like to translate
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems='center' justifyContent="center">
                            <Grid item>
                                <CameraButton background='white' />
                            </Grid>
                            <Grid item>
                                <TextButton background='white' />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ m: 0 }} direction="column" alignItems="right" justifyContent="flex-end">
                            <Grid item>
                                <Typography variant='body1' color='white'>
                                    Or
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' color='white'>
                                    Discover more below
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ m: 1 }}>
                            <Button
                                fullWidth
                                variant="text"
                                color="primary"
                                sx={{ bgcolor: 'white', minHeight: '40px', width: '280px', color: 'primary' }}
                                href="#"
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="info"
                                sx={{ mt: 3, mb: 2, color: 'white', minHeight: '40px', width: '280px', border: '2px solid' }}
                                href="#"
                            >
                                Sign Up
                            </Button>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid >
        </ThemeProvider >
    );
}