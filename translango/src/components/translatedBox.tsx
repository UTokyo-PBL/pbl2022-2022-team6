import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Avatar, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

export default function TranslatedBox(props: any) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container gap={6} component={Paper} direction="row" borderRadius={25} display="flex" alignItems="center" wrap='nowrap' color="primary">
                <Grid item xs={8} sx={{ m: 1 }}>
                    <Chip avatar={<Avatar>{props.oglanguage}</Avatar>} label={props.ogtext} color="primary" />
                </Grid>
                <AutorenewIcon color="success" fontSize="small" />
                <Grid item xs={8} sx={{ m: 1 }}>
                    <Chip avatar={<Avatar>{props.translatedlanguage}</Avatar>} label={props.translatedtext} color="primary" />
                </Grid>
            </Grid>
        </ThemeProvider>

    );
}

