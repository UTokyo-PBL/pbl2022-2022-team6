import { Button, CardActions, CardHeader, CssBaseline, Grid, ThemeProvider, Toolbar, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import theme from '../../theme/theme';
import ToggleSwitch from "../../components/ToggleSwitch";
import TopNavigation from "../../components/TopNavigation";
import Copyright from "../../components/Copyright";
import BottomNavigation from "../../components/BottomNavigation";
import axios from "axios";
// import CommonTranslationController from "../../api/translation/common.handler";
// import { uploadFile } from 'react-s3';
import Resizer from "react-image-file-resizer";
import ViewObject from "../../components/viewObject";
import TranslationObject from "../../components/translationObject";

// Use URL.revokeObjectURL(img.src) in large scale production

const S3_BUCKET = 'YOUR_BUCKET_NAME';
const REGION = 'YOUR_REGION_NAME';
const ACCESS_KEY = 'YOUR_ACCESS_KEY';
const SECRET_ACCESS_KEY = 'YOUR_SECRET_ACCESS_KEY';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}


export interface uploadProps {

}

export interface uploadStates {
    rawurl: string;

}

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export default function ViewTranslations(props: any) {


    const location = useLocation();

    const [rawurl, setRawURL] = useState(location.state.rawurl);
    const [updateImage, setUpdateImage] = useState(false);
    const [toggledObject, setToggledObject] = React.useState(true);

    const navigate = useNavigate();
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToggledObject(event.target.checked);
        // console.log(toggledObject);
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopNavigation />
            <Grid container direction="column" color="primary">
                <Grid item xs={12} sm={9} md={10} alignItems="center" sx={{ m: 2, display: 'flex' }}>
                    {/* <Toolbar /> */}
                    <ViewObject rawurl={rawurl} detectedObject="Dog" />
                </Grid>
                <Grid item xs={12} sm={9} md={10} alignItems="left" sx={{ m: 2 }}>
                    <Typography variant="h5" color="purple" component="div">
                        Your favourite languages
                    </Typography>
                    {/* <Toolbar /> */}
                    <TranslationObject rawurl={rawurl} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

