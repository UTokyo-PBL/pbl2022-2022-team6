import { Link, Typography } from "@mui/material";
import * as React from 'react';


export default function Copyright(props: any) {
    return (
        <Typography variant="subtitle1" align="center" {...props}>
            {'Copyright © '}
            <Link color='inherit' href="https://localhost:3000">
                TranslanGo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}