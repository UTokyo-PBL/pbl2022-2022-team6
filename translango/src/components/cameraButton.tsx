import { Avatar, Box, Button, makeStyles, ThemeProvider } from '@mui/material';
import React, { Component } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import theme from '../theme/theme';



export default class CameraButton extends Component<{ background: string }, {}> {

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
                <Button variant='text' color="secondary" aria-label="Camera" sx={cameraStyle} href="#">
                    <CameraAltIcon color="secondary" sx={{ fontSize: 100 }} />
                    <span>Camera</span>
                </Button>
            </ThemeProvider>

        )

    }

}

