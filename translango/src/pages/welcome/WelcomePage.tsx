// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import * as locales from '@mui/material/locale';
// import { useTranslation } from 'react-i18next'


// Components
import MainIcon from '../../components/MainIcon';
import TranslanGoText from '../../components/TranslanGoText';
import CameraButton from '../../components/cameraButton';
import Copyright from '../../components/Copyright';


// theme
import theme from '../../theme/theme';
import TextButton from '../../components/TextButton';
import SelectLanguage from '../../components/selectLanguage';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppCtx, { AppCtxUpdater, TRANSLATION_KEYS } from '../../store/app-state-context';

// type SupportedLocales = keyof typeof locales;




export default function WelcomePage() {
    const ctx = useContext(AppCtx);
    const ctxUpdater = useContext(AppCtxUpdater);
    const t = (key: TRANSLATION_KEYS) => ctx.translations[ctx.nativeLanguage] ? ctx.translations[ctx.nativeLanguage][key] : ctx.translations['en'][key];

    return (
        // <ThemeProvider theme={themeWithLocale}>
            <Grid container component="main" sx={{ height: '100vh', bgcolor: 'primary.main' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?nature)',
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
                            my: 3,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'primary'
                        }}
                    >
                        <Grid container direction="row" alignItems="center" sx={{ m: 4 }}>
                            <Grid item>
                                <MainIcon background='primary.main' />
                            </Grid>
                            <Grid item>
                                <TranslanGoText background='white' />
                            </Grid>
                        </Grid>
                        <Grid container direction="column" alignItems="center" justifyContent="flex-end">
                            <Grid item>
                                <Typography variant='h4' color='white' fontWeight='bold'>
                                    {t("WELCOME")}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' color='white'>
                                    {t('CHOOSE_TRANSLATE')}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems='center' justifyContent="center" >
                            <Grid item>
                                <CameraButton background='white' />
                            </Grid>
                            <Grid item>
                                <TextButton background='white' />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ m: 0 }} direction="column" alignItems="center" justifyContent="flex-end">
                            <Grid item>
                                <Typography variant='body1' color='white'>
                                    {t("OR")}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' color='white'>
                                    {t("DISCOVER_MORE_BELOW")}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ m: 1 }} direction="column" alignItems="center" justifyContent="flex-end">
                            <Button
                                fullWidth
                                variant="text"
                                color="primary"
                                sx={{ bgcolor: 'white', minHeight: '40px', width: '280px', color: 'primary' }}
                                href="/signin"
                            >
                                {t("SIGN_IN")}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="info"
                                sx={{ mt: 3, mb: 2, color: 'white', minHeight: '40px', width: '280px', border: '2px solid' }}
                                href="/sign-up"
                            >
                                {t("SIGN_UP")}
                            </Button>




                        </Grid>

                        <Grid container direction="column" alignItems='center'>
                            <Grid item>
                                <SelectLanguage />
                            </Grid>
                            <Grid item>
                                <Copyright sx={{ mt: 1, color: 'white' }} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        // </ThemeProvider >
    );
}