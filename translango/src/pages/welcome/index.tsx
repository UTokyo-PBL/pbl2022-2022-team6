import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

// Components
import MainIcon from '../../components/MainIcon';
import TranslanGoText from '../../components/TranslanGoText';
import CameraButton from '../../components/cameraButton';
import Copyright from '../../components/Copyright';


// theme
import theme from '../../theme/theme';
import TextButton from '../../components/TextButton';


export default function WelcomePage() {

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
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} bgcolor='primary.main'>
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

                            <Copyright sx={{ mt: 5, color: 'white' }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid >
        </ThemeProvider >
    );
}