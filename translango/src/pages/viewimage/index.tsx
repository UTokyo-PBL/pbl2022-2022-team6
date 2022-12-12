import { Button, CardActions, CardHeader, CssBaseline, ThemeProvider } from "@mui/material";
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
// import { uploadFile } from 'react-s3';
import Resizer from "react-image-file-resizer";


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
export default function ViewImage(props: any) {


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
            <Card sx={{
                minWidth: '345px',
                m: 2,
                display: 'block',
            }}
                component='form'
            >
                <CardHeader
                    action={
                        <ToggleSwitch name="toggleObject" onChange={handleToggle} />
                    }
                    titleTypographyProps={{ variant: 'body1', align: 'left' }}
                    subheaderTypographyProps={{ variant: 'caption', align: 'left' }}
                    title="Ready to Scan"
                    subheader="Choose between text or object translation"
                />
                <CardMedia
                    component="img"
                    // height="400"
                    image={rawurl}
                    alt="A Photo"
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                <CardActions sx={{ m: 2, display: "flex", justifyContent: "flex-end" }}>
                    <Button size="small" variant="outlined" component='label' sx={{ m: 2 }}>
                        <input style={{ "display": "none" }} type="file" accept="image/*" onChange={changeImage} />
                        Change Picture
                    </Button>
                    <Button type="submit" size="small" color='secondary' variant="contained" onClick={goScan}>Scan</Button>

                </CardActions>
            </Card>
            {/* <img src={location.state.rawurl} /> */}
            {/* <BottomNavigation /> */}
            <Copyright sx={{ mt: 5, color: 'purple' }} />
        </ThemeProvider>
    );
}

