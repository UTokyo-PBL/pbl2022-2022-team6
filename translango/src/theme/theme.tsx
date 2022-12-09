import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { blue, deepPurple } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Palette {
        lightText?: Palette['primary'],
        darkText?: Palette['primary']
    }
    interface PaletteOptions {
        lightText?: PaletteOptions['primary'],
        darkText?: PaletteOptions['primary']
    }
}

const theme = responsiveFontSizes(createTheme({
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
        },
        lightText: {
            main: "#eeeeee",
            light: "#ffffff",
            dark: "#dddddd"
        },
        darkText: {
            main: "#121212",
            light: "#232323",
            dark: "#000000"
        }
    },
    // typography: {
    //     allVariants: {
    //         color: "purple"
    //     },
    // },

}
));

export default theme;
