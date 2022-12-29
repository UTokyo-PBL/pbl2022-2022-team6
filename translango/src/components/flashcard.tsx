import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Grid, Snackbar } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

export default function FlashCard(props: any) {

    const [disabled, setDisabled] = React.useState<any[]>([false, false]);
    const [colors, setColors] = React.useState<any[]>(['primary', 'primary']);
    const [chosen, setChosen] = React.useState(false);
    const [successAlert, setSuccessAlert] = React.useState(false);
    // const [errorAlert, setErrorAlert] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [internalScore, setInternalScore] = React.useState(0);
    const sendAttempted = props.settingAttempted;
    const sendScore = props.settingScore;

    React.useEffect(() => {
        // console.log(props)
        setDisabled([false, false]);
        setColors(['primary', 'primary']);
        setChosen(false);
        setSuccessAlert(false);
        setOpen(false);
    }, [props.options])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        // props.getScores(internalScore, true);
    };

    // const sendScore = (score: number) => {
    //     props.getScores(score);
    // }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>, selected: number) => {
        event.preventDefault();
        if (chosen) {
            return;
        }
        setChosen(true);
        const newColors = ['primary', 'primary'];
        const newView = [false, false];
        if (selected === props.options?.correctIndex) {
            newColors[selected] = 'success';
            newView[1 - selected] = true;
            setSuccessAlert(true);
            setInternalScore(internalScore + 1);
        }
        else {
            newColors[selected] = 'error';
            newView[1 - selected] = true;
            setSuccessAlert(false);
        }
        setOpen(true);
        setColors(newColors);
        setDisabled(newView);
        sendScore(internalScore);
        sendAttempted(props.options?.step);
        setChosen(true);
        // console.log(internalScore)

    }
    return (
        <Card >
            <CardMedia
                sx={{ width: 300, height: 300, objectFit: "contain" }}
                image={props.image_url}
                title="Detected object"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Select the translation in
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {props.options?.language}
                    {/* Japanese */}
                </Typography>
                <Grid container spacing={1} direction='column' alignItems='center'>
                    <Grid item>
                        <Button sx={{ width: 200, justifyContent: 'left' }} onClick={(event) => handleSubmit(event, 0)} color={colors[0]} disabled={disabled[0]} variant='contained' startIcon={<CircleIcon />}>{props.options?.options[0]}</Button>
                    </Grid>
                    <Grid item >
                        <Button sx={{ width: 200, justifyContent: 'left' }} onClick={(event) => handleSubmit(event, 1)} color={colors[1]} disabled={disabled[1]} variant='contained' startIcon={<CircleIcon />}>{props.options?.options[1]}</Button>
                    </Grid>
                    <Grid item sx={{ mb: 1, width: 260 }}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                            {successAlert ? <Alert severity='success'>Woohoo! Great Job</Alert> : <Alert severity='error'>Oh no, Try Again Later!</Alert>}
                            {/* {errorAlert ?  : null} */}
                        </Snackbar>

                    </Grid>
                </Grid>

            </CardContent>
            {/* <CardActions sx={{ direction: 'column', justifyContent: 'center', alignItems: 'center', m: -1 }}> */}

            {/* </CardActions> */}
        </Card>
    );
}