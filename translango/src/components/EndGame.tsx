import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';



export default function EndGame(props: any) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        // <Box sx={{ height: 180 }}>
        <Zoom in={checked}>
            <Card sx={{ m: 2 }}>


                <CardMedia
                    image="https://media3.giphy.com/media/2lQCBjuFMLCOvXno4l/giphy.gif?cid=790b7611414a93ff27434e7720b57442c72908f898602023&rid=giphy.gif&ct=gf"
                    sx={{ m: 2, width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto', objectFit: "contain", alignItems: 'center', justifyContent: 'center' }}
                />
                <CardContent>
                    <Typography variant="h4" color="text.primary" align='center'>
                        We are rooting for you!
                    </Typography>
                    <Typography variant="h6" color="text.secondary" align='center'>
                        You've done a great job so far, keep up the good work!
                    </Typography>
                    {props.practice ? null : <Typography variant="h6" color="primary" align='center'>
                        You've earned {props.points} points!
                    </Typography>}
                </CardContent>



            </Card>
        </Zoom>

        // </Box>
    );
}
