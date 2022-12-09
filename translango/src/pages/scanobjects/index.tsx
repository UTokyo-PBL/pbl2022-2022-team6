import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { useState } from "react";
import theme from "../../theme/theme";

export default function ScanObjects(props: any) {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

        </ThemeProvider>
    )
}