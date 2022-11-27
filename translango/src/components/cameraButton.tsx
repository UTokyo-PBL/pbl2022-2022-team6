import { Avatar, Box, Button, makeStyles, ThemeProvider } from '@mui/material';
import React, { Component, useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import theme from '../theme/theme';
import { useNavigate } from 'react-router-dom';

export interface UploadImageProps {
    user?: any;
    uid?: string;
    background: string;
}

export interface UploadImageState {
    imgurl: string;
    img: any;
    height: number;
    width: number;
    rawurl: string;
    location: any;
    check: boolean;
    coordinates: any;
    setLocation: boolean;
    posted: boolean;
}



export default class CameraButton extends Component<UploadImageProps, UploadImageState> {

    constructor(UploadImageProps: any) {
        super(UploadImageProps);

        this.state = {
            imgurl: '',
            img: {},
            height: 0,
            width: 0,
            rawurl: 'https://wallpapercave.com/wp/wp3597484.jpg',
            location: {},
            check: false,
            coordinates: {},
            setLocation: false,
            posted: false,
        };
    }

    render() {
        const background = this.props.background;
        const cameraStyle = {
            bgcolor: background,
            m: 2,
            color: 'secondary',
            flexDirection: 'column',
            maxWidth: '100%',
            fullWidth: 'true',
            borderRadius: 4,
            "& .MuiButton-startIcon": { margin: 0 }
        };


        return (
            <ThemeProvider theme={theme}>
                <Button variant='text' color="secondary" aria-label="Camera" sx={cameraStyle} href="/upload-image">
                    <CameraAltIcon color="secondary" sx={{ fontSize: 100 }} />
                    <span>Camera</span>
                </Button>
            </ThemeProvider>

        )

    }

}

