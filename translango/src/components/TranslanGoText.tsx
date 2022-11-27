import { Box, ThemeProvider, Typography } from '@mui/material';
import React, { Component } from 'react';
import theme from '../theme/theme'

export default class TranslanGoText extends Component<{ background: string }, {}>  {

    render() {
        const { background } = this.props;
        return (

            <ThemeProvider theme={theme}>
                <Typography variant="h3" fontWeight='bold' color={background}>
                    Translan
                    <Box sx={{ textAlign: 'left', fontStyle: 'italic', fontWeight: 'bold', display: 'inline' }} >
                        Go
                    </Box>
                </Typography >
            </ThemeProvider >

        )

    }

}