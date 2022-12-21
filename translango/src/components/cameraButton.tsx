import { Button, ThemeProvider } from '@mui/material';
import React, { Component } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import theme from '../theme/theme';
import { Navigate } from "react-router-dom";
import { withTranslation, WithTranslation } from 'react-i18next';


export interface UploadImageProps extends WithTranslation {
    user?: any;
    uid?: string;
    background: string;
}

export interface UploadImageState {
    imgurl: string;
    img: any;
    uploadedimg: boolean;
    height: number;
    width: number;
    rawurl: string;
    location: any;
    check: boolean;
    coordinates: any;
    setLocation: boolean;
    posted: boolean;
}


class CameraButton extends Component<UploadImageProps, UploadImageState> {

    constructor(UploadImageProps: any) {
        super(UploadImageProps);

        this.state = {
            imgurl: '',
            img: {},
            uploadedimg: false,
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


    changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) return;
        // event.persist();
        const file = event.target.files[0];
        this.setState({ img: file, rawurl: URL.createObjectURL(file), uploadedimg: true });

        await new Promise<void>((resolve, reject) => {
            console.log('async', this.state.rawurl)
            resolve();
        })
        console.log(this.state.rawurl)
    };

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
            <>
                {this.state.uploadedimg && (
                    <Navigate to="/view-image" replace={true} state={this.state} />
                )}
                <ThemeProvider theme={theme}>
                    <Button variant='text' color="secondary" aria-label="Camera" sx={cameraStyle} component='label'>
                        <input hidden type="file" accept="image/*" onChange={this.changeImage} />
                        <CameraAltIcon color="secondary" sx={{ fontSize: 100 }} />
                        <span>{this.props.t('Camera')}</span>
                    </Button>
                </ThemeProvider>
            </>
        )

    }

}

export default withTranslation()(CameraButton);
