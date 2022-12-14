import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactCountryFlag from 'react-country-flag';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState } from 'react';
import ShareButton from './shareButton';
import { Button } from '@mui/material';



interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

/*
    What We Need here:

    list of:
        1. language code of translated text
        2. mapping of language code between react speech kit and google translate
        3. translated text
        4. language name of translated text
*/

// const uploadButton = styled((props: any) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
//   })(({ theme }) => ({
//     marginLeft: 'auto',
// }));

export default function TranslationObject() {
    const [expanded, setExpanded] = React.useState(false);
    const [lang, setLang] = useState('ja-JP')
    const [value, setValue] = useState('いぬ');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

    const voice_index = voices.map((l: any) => l.lang).indexOf(lang);

    const voice = voices[voice_index];


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const languages = ["Spanish", "Japanese", "Chinese"]
    return (
        <>
            {
                languages.map((language) => {
                    if (language) {
                        return (
                            <Card sx={{ m: 2 }}>
                                <CardHeader
                                    action={
                                        <IconButton aria-label="settings" onClick={() => speak({ text: value, voice: voice })} >
                                            <VolumeUpIcon />
                                        </IconButton>
                                    }
                                    title={language}
                                    titleTypographyProps={{ variant: 'h5' }}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Translation: いぬ
                                    </Typography>
                                </CardContent>
                                {/* <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions> */}
                                <CardActions disableSpacing>
                                    {/* <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}> */}
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <ShareButton rawurl={window.location.href} title={value} />
                                    <Button size="small" sx={{ marginLeft: 'auto' }}>Upload</Button>
                                    {/* </Box> */}
                                </CardActions>
                            </Card>
                        );
                    }
                })
            }
        </>
    );
}
