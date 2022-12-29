import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MainIconSolid from './MainIconSolid';
import { ThemeProvider } from '@mui/system';
import { Avatar, CssBaseline, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import theme from '../theme/theme';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserController from '../controllers/user/user.controller';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function TopNavigation(props: any) {
    const [auth, setAuth] = React.useState(false);
    const [profileURL, setProfileURL] = React.useState('');
    const [userdata, setUserdata] = React.useState<null | any>(null);
    const [username, setUsername] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);




    const getData = () => {
        UserController.getUserProfile().then(async (OpenAPIResponse) => {
            setUserdata(OpenAPIResponse.data);
            // console.log(OpenAPIResponse.data);
        }).catch().finally();
    };

    useEffect(() => {
        getData();
        if (userdata) {
            if (userdata.id !== '') {
                setAuth(true);
            }

            setUsername(userdata.username);

            if (userdata.profile_image !== 'select') {
                setProfileURL(userdata.profile_image);
            }
        }

    });

    const navigate = useNavigate();


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={theme}>

            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar sx={{
                    justifyContent: "space-between"
                }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Photos
                    </Typography> */}
                    <Stack direction="row" alignItems="center">
                        <MainIconSolid darklogo={false} />
                        <Typography
                            variant="h5"

                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex' },
                                flexGrow: 1,
                                fontFamily: 'sans-serif',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Translan<Box sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>Go</Box>
                        </Typography>

                    </Stack>

                    {auth && (
                        <div style={{ float: 'right' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar alt={username} src={profileURL} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => navigate(`/profilepage/${userdata.id}`)}>My Account</MenuItem>
                                <MenuItem onClick={handleClose}>Settings</MenuItem>
                                <MenuItem>Log Out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </ThemeProvider >


    );
}
export default TopNavigation;
