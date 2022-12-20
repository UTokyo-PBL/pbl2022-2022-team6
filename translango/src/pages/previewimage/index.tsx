import { Button, CardActions, CardHeader, CssBaseline, ThemeProvider } from "@mui/material";
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
import AWS from 'aws-sdk';
import DashboardController from '../../controllers/dashboard/dashboard.controller'
import UserController from "../../controllers/user/user.controller";
// Use URL.revokeObjectURL(img.src) in large scale production
import { v4 as uuidv4 } from 'uuid';


const S3_BUCKET = 'team6-bucket01';
const REGION = 'us-east-1';
const ACCESS_KEY = 'ASIASU4NVN3G6L2WWLFN';
const SECRET_ACCESS_KEY = 'Mp1IjYigNY2RF4sNjMmzC69MHjwvVwfRRjZ7UVZt';
const SESSION_TOKEN = 'FwoGZXIvYXdzEOX//////////wEaDJOZUZrCwKRYb8ffOyLTAclpij6/6iEEw6305+USlXyG+eN4mke8AmsMIlX2VSzvUW+yHm84BCtMWKoE0qms11p8hCexkv6ME1GpwEYdM61kN7CcrkeiN1AobgAP6d3pUItgMcoS0eDcr9Hzns3qWoPdgLzEUJnW4qstyDQtUkkMYoUpZWu3HHT/hcs1sEXg7dVdSyRC4djmd3tHvJ4S67ni755C8RWyRxVsnz4Jz3J0c8/JLVw3GWayRr7NLb9YSlW0gCEmrlvC5FhbONzl+s1WKwAOQcwjXKazwEzMvy3gPKAoudnvnAYyLeaU+DUxMXLh9NmkeZ4XkMN3B7nJFeoxT8rUvRzjvnAIsVhHFMp4IAxCgglnVw==';

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    sessionToken: SESSION_TOKEN,
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
export default function PreviewImage(props: any) {


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
            Key: name,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
        };

        console.log(params);

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
        // try {
        // Resize image
        const image = await resizeFile(imgObj);
        console.log(image);
        const image_id = uuidv4();
        // Upload to S3
        uploadFile(imgObj, image_id);

        const image_url = getUrlFromBucket(image_id);
        console.log(image_url)

        if (toggledObject === true) {
            DashboardController.translateImageFromUrl({
                id: image_id,
                type: 'object',
                image_url: image_url,
                original: { 'id': uuidv4(), 'language': "en" },
                target: [{ "id": uuidv4(), "language": "ja" }]
            }).then((OpenAPIResponse) => {
                console.log("Check this")
                console.log(OpenAPIResponse)
            });
            DashboardController.getOneItem({
                id: image_id,
            }).then((OpenAPIResponse) => {
                console.log("Image Info")
                console.log(OpenAPIResponse)
            })
            navigate(`/viewtranslations/${image_id}`, { state: { rawurl: rawurl, detectedObject: 'Dog' } });
        }
        else {
            navigate('/scantext');
        }
        // } catch (err) {
        // console.log(err);
        // }
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
                    <Button size="small" color='secondary' variant="contained" onClick={goScan}>Scan</Button>

                </CardActions>
            </Card>
            {/* <img src={location.state.rawurl} /> */}
            {/* <BottomNavigation /> */}
            <Copyright sx={{ mt: 5, color: 'purple' }} />
        </ThemeProvider>
    );
}

