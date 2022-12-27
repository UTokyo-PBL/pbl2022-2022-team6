import { Box, Button, CardActions, CardHeader, CssBaseline, Grid, Input, InputAdornment, InputLabel, Paper, Stack, styled, TextField, ThemeProvider } from "@mui/material";
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


export default function PreviewPost(props: any) {


    const location = useLocation();
    const navigate = useNavigate();
    const { translationID } = useParams();


    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '25px',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user_data = {
            email: "example@translango.com",
            password: "passw0rd",
        };
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <TopNavigation />
                <Grid item xs={3}>
                    <SinglePost photo_id={translationID} photo_url={location.state.rawurl} date={new Date().toLocaleString().split(',')[0] + ''} />
                </Grid>

            </Grid>


        </ThemeProvider >
    );
}

