import { Avatar, Box, Button, CardActions, CardHeader, CssBaseline, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, styled, TextField, ThemeProvider, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import theme from '../../theme/theme';
import TopNavigation from "../../components/TopNavigation";

import axios from "axios";
// import CommonTranslationController from "../../api/translation/common.handler";
// import { uploadFile } from 'react-s3';
import AWS from 'aws-sdk';
import DashboardController from '../../controllers/dashboard/dashboard.controller'
import TranslatedBox from "../../components/translatedBox";
import EnterCaption from "../../components/enterCaption";
import RoomIcon from '@mui/icons-material/Room';
import SendIcon from '@mui/icons-material/Send';
import Copyright from "../../components/Copyright";
import Autocomplete from "react-google-autocomplete";
import SinglePost from "../../components/singlePost";
import UserController from "../../controllers/user/user.controller";
import MapComponent from "../../components/Mapcomponent";
import BottomNavigation from "../../components/BottomNavigation";


export default function GameScreen(props: any) {


    const location = useLocation();
    const navigate = useNavigate();
    const { userID } = useParams();

    // const [language, setLanguage] = useState('ja');
    // const [languageName, setLanguageName] = useState('Japanese');


    return (
        <ThemeProvider theme={theme}>
            <TopNavigation />
            <Grid container component="main" direction="column" alignItems="center" justifyContent="center" spacing={6} sx={{ height: '100vh', bgcolor: 'primary.light' }}>
                <CssBaseline />


                <Grid item>
                    <IconButton onClick={() => { navigate(`/practice/${userID}`) }}>
                        <Avatar sx={{ width: 160, height: 160, backgroundImage: "url(https://source.unsplash.com/random/?purple,dark)" }}>
                            <Typography fontWeight="bold" variant="h4">PRACTICE</Typography>
                        </Avatar>
                    </IconButton>

                </Grid>
                <Grid item alignContent="center">
                    <Typography variant="h4" align="center" fontWeight="bold">Language Quiz!</Typography>
                    <Typography variant="h6" align="center">Select your language and choose to test your knowledge with this short quiz</Typography>
                    SELECT LANGUAGE
                </Grid>
                <Grid item>
                    <IconButton onClick={() => { navigate(`/quiz/${userID}`) }}>
                        <Avatar sx={{ width: 160, height: 160, backgroundImage: "url(https://source.unsplash.com/random/?pink,sky)" }}>
                            <Typography fontWeight="bold" variant="h4">QUIZ</Typography>
                        </Avatar>
                    </IconButton>
                </Grid>
                <BottomNavigation />
            </Grid>
        </ThemeProvider >
    );
}

