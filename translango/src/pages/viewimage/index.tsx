import { Box, Button, CardActions, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import { useLocation } from 'react-router-dom';
import theme from '../../theme/theme';
import ToggleSwitch from "../../components/ToggleSwitch";



export interface uploadProps {

}

export interface uploadStates {
    webcamRef: any
}

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export const ViewImage = () => {


    const location = useLocation();



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Card sx={{
                width: {
                    sx: 0.7, // 100%
                },
                m: 2,
            }}>
                <CardMedia
                    component="img"
                    // height="400"
                    image={location.state.rawurl}
                    alt="A Photo"
                />
                <CardActions>
                    <ToggleSwitch />
                    <Button size="small">Scan</Button>
                    <Button size="small">Change Picture</Button>
                </CardActions>
            </Card>
            {/* <img src={location.state.rawurl} /> */}
        </ThemeProvider>
    );
}

