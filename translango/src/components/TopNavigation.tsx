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
import { CssBaseline, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import theme from '../theme/theme';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserController from '../controllers/user/user.controller';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function TopNavigation(props: any) {
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        UserController.getUserProfile().then((OpenAPIResponse) => {
            // console.log(OpenAPIResponse)
            const isLoggedIn = OpenAPIResponse.data.id !== '';
            setAuth(isLoggedIn);
        })
    }, []);

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
                                <AccountCircle />
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
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
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
