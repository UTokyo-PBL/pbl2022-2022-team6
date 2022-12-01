import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { blue, deepPurple } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        background: {
            default: "#FAEEFC",
        },
        primary: {
            main: '#8338EC',
            light: '#FAEEFC',
            dark: deepPurple[900],
        },
        secondary: {
            main: blue[500],
            light: blue[50],
            dark: blue[900]
        },
        info: {
            main: '#FFFFFF',
        }
    },
    // typography: {
    //     allVariants: {
    //         color: "purple"
    //     },
    // },

}
);

export default responsiveFontSizes(theme);
