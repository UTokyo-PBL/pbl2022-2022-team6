import { Box, Button, CardActions, CardHeader, CssBaseline, Grid, Input, InputAdornment, InputLabel, Stack, styled, TextField, ThemeProvider } from "@mui/material";
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


export default function CreatePost(props: any) {


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
            <TopNavigation />
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" display="flex">
                <Grid item alignItems="center" sx={{ m: 2, maxWidth: '80%' }}>

                    <Img src={location.state.rawurl} />
                </Grid>

                <Grid item alignItems="center" sx={{ m: 2, maxWidth: '80%' }}>
                    <TranslatedBox ogtext="Dog" translatedtext="いぬ" oglanguage="EN" translatedlanguage="JP" />
                </Grid>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{
                    m: 2, p: 4, width: '90%', alignSelf: 'center', backgroundColor: '#FBE0FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px'
                }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Caption"
                        multiline
                        rows={4}
                        placeholder="Share your thoughts here..."
                        color="secondary"
                        fullWidth
                        sx={{ backgroundColor: 'white' }}
                    />
                    <InputLabel>Location</InputLabel>
                    <Input
                        startAdornment={
                            <InputAdornment position="start">
                                <RoomIcon color="secondary" />
                            </InputAdornment>
                        }
                        color="secondary"
                        placeholder="Tokyo, Japan"
                        fullWidth
                        sx={{ m: 1 }}
                        inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                            <Autocomplete
                                apiKey="AIzaSyCNKzmgqLSVBnT05TLmkkiBR_s9JwnM2k"
                                {...props}
                                onPlaceSelected={(selected) => console.log(selected)}
                            />
                        )}
                    />
                    <Stack direction="row" spacing={2} sx={{
                        m: 4, display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Button variant="outlined" onClick={() => navigate(`/previewpost/${translationID}`, { state: { ...props, rawurl: location.state.rawurl } })}>
                            Preview
                        </Button>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                            Upload
                        </Button>
                    </Stack>
                </Box>
            </Grid>
            <Copyright />
        </ThemeProvider >
    );
}

