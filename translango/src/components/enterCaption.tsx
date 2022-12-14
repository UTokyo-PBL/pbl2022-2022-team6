import { Chip, FormControl, Grid, MenuItem, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import i18next from '../i18n';
import theme from '../theme/theme';
import AutorenewIcon from '@mui/icons-material/Autorenew';





export default function EnterCaption(props: any) {

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ width: '100%' }}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Caption"
                    multiline
                    rows={4}
                    placeholder="Write your caption here..."
                />
            </Paper>

        </ThemeProvider >
    );
}

