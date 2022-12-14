import { Button, CardActions, CardHeader, CssBaseline, Grid, ThemeProvider, Toolbar, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React, { useState } from "react";
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





    const changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) return;
        event.persist();
        const file = await event.target.files[0];

        setRawURL(URL.createObjectURL(file));
        setUpdateImage(true);


        await new Promise<void>((resolve, reject) => {
            console.log('async', event.target.value)
            resolve();
        })

    };


    const resizeFile = (file: any) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                400,
                "JPEG",
                50,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    // const uploadtoS3 = async (file: any) => {
    //     uploadFile(file, config)
    //         .then((data: any) => console.log(data))
    //         .catch((err: any) => console.error(err));
    // }
    const goScan = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // console.log(toggledObject);

        if (toggledObject === true) {
            navigate('/scanobjects');

            // SEND TO S3

            const imageObject = {
                type: 'object',
                image_url: '',
                location: null,
                preferred_languages: {
                    code: 'en'
                }

            }
            // CommonTranslationController.detectFromImage(imageObject)
        }
        else {
            navigate('/scantext');
        }


    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopNavigation />
            <Grid container direction="column" color="primary">
                <Grid item xs={12} sm={8} md={5} direction="column" alignItems="center" sx={{ m: 2, display: 'flex' }}>
                    <Toolbar />
                    <ViewObject rawurl={rawurl} detectedObject="Dog" />
                </Grid>
                <Grid item xs={12} sm={8} md={5} direction="column" alignItems="left" sx={{ m: 2 }}>
                    <Typography variant="h5" color="purple" component="div">
                        Your favourite languages
                    </Typography>
                    {/* <Toolbar /> */}
                    <TranslationObject />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

