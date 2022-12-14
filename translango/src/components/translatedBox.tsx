import { Chip, FormControl, Grid, MenuItem, Paper, ThemeProvider, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import i18next from '../i18n';
import theme from '../theme/theme';
import AutorenewIcon from '@mui/icons-material/Autorenew';





export default function TranslatedBox(props: any) {

    const [ogText, setOgText] = useState();
    const [translatedText, setTranslatedText] = useState(props.translatedtext);

    return (
        <ThemeProvider theme={theme}>
            <Grid container gap={6} component={Paper} direction="row" borderRadius={25} display="flex" alignItems="center" wrap='nowrap' color="primary">
                <Grid item xs={8} sx={{ m: 1 }}>
                    <Chip label={props.ogtext} color="primary" />
                </Grid>
                <AutorenewIcon color="success" fontSize="small" />
                <Grid item xs={8} sx={{ m: 1 }}>
                    <Chip label={props.translatedtext} color="primary" />
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

