import { Avatar, CssBaseline, Grid, IconButton, ThemeProvider, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import theme from '../../theme/theme';
import TopNavigation from "../../components/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation";


export default function GameScreen(props: any) {


    const location = useLocation();
    const navigate = useNavigate();
    const { userID } = useParams();

    // const [language, setLanguage] = useState('ja');
    // const [languageName, setLanguageName] = useState('Japanese');


    return (
        <ThemeProvider theme={theme}>
            <TopNavigation />
            <Grid container component="main" direction="column" alignItems="center" justifyContent="center" spacing={6} sx={{ height: '100vh', bgcolor: 'primary.light' }}>
                <CssBaseline />


                <Grid item>
                    <IconButton onClick={() => { navigate(`/practice/${userID}`) }}>
                        <Avatar sx={{ width: 160, height: 160, backgroundImage: "url(https://source.unsplash.com/random/?purple,dark)" }}>
                            <Typography fontWeight="bold" variant="h4">PRACTICE</Typography>
                        </Avatar>
                    </IconButton>

                </Grid>
                <Grid item alignContent="center">
                    <Typography variant="h4" align="center" fontWeight="bold" color="primary.main">Language Quiz!</Typography>
                    <Typography variant="h6" align="center" color="primary.main">Select your language and choose to test your knowledge with this short quiz</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => { navigate(`/quiz/${userID}`) }}>
                        <Avatar sx={{ width: 160, height: 160, backgroundImage: "url(https://source.unsplash.com/random/?pink,sky)" }}>
                            <Typography fontWeight="bold" variant="h4">QUIZ</Typography>
                        </Avatar>
                    </IconButton>
                </Grid>
                <BottomNavigation />
            </Grid>
        </ThemeProvider >
    );
}

