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
// import CommonTranslationController from "../../api/translation/common.handler";
// import { uploadFile } from 'react-s3';
import Resizer from "react-image-file-resizer";
import AWS from 'aws-sdk';
import DashboardController from '../../controllers/dashboard/dashboard.controller'
// Use URL.revokeObjectURL(img.src) in large scale production

const S3_BUCKET = 'team6-bucket01';
const REGION = 'us-east-1';
const ACCESS_KEY = 'ASIASU4NVN3GZK2JFK6C';
const SECRET_ACCESS_KEY = 'pTpBOjXWp7NwJrm2zk5LapTY6eu40itE5Mc6QqHF';

// Dx9wOeUCbmGTY3mX7YHo0Su38bZbHeA2Npe4VQHs
// aws_session_token=FwoGZXIvYXdzEEMaDHCG3vCaUpT7td2FUiLTATxW/Z6p74EgLamVpUPI0G3IDZwNuISNTp1VesKxUDIWvtq6F8YEb8CbYMB2CASm/vf1V4jpyyuqr02q8PVpyJTsU2ckdBtcQtDvRjFsneNg2XNoPWxjFbOgwMmWKWc7j7+lq6MagfkG/QPgW+cNUba9eRsbqKYQbY1tSakNhoiklbacwBHxEj61FhaQ5NcGu8wEIVg50xXyu7oKjeS5D9aGC87W1by8y1gUgmV5rjODM5dirB1vnPPDHbEtPRRctlB7wwBvIBVWHJ+NRG+BIgWJvQ0oyYjMnAYyLQXN/b24OH5Bz+2QQ7W/aoMtaIaxpGdZdyYIBEQaLy50qc++G1r8Hel+YJ+LXA==
AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})


export interface uploadProps {

}

export interface uploadStates {
    rawurl: string;

}

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export default function ViewImage(props: any) {


    const location = useLocation();

    const [rawurl, setRawURL] = useState(location.state.rawurl);
    const [imgObj, setImgObj] = useState(location.state.img);
    const [updateImage, setUpdateImage] = useState(false);
    const [toggledObject, setToggledObject] = React.useState(true);

    const controller = new DashboardController();
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
        setImgObj(file);


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

    const uploadFile = (file: any, name: string) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: name
        };

        myBucket.putObject(params)
            .send((err) => {
                if (err) console.log(err)
            })
    }
    const getUrlFromBucket = (fileName: string) => {
        const regionString = REGION.includes('us-east-1') ? '' : ('-' + REGION)
        return `https://${S3_BUCKET}.s3${regionString}.amazonaws.com/${fileName}`
    };

    const goScan = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            // Resize image
            const image = await resizeFile(imgObj);
            console.log(image);

            // Upload to S3
            uploadFile(image, "test");

            const image_url = getUrlFromBucket("test");

            if (toggledObject === true) {
                navigate('/viewtranslations', { state: { rawurl: rawurl, detectedObject: 'Dog' } });
                const imageObject = {
                    type: 'object',
                    image_url: rawurl,
                    original: {
                        language: "en",
                        text: ""
                    },
                    target: ["jp"],
                };

                // }


                let response = DashboardController.translateImageFromUrl(imageObject);
                // console.log();

                await new Promise<void>((resolve, reject) => {
                    console.log(response)
                    resolve();
                })

                // CommonTranslationController.detectFromImage(imageObject)
            }
            else {
                navigate('/scantext');
            }

        } catch (err) {
            console.log(err);
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

