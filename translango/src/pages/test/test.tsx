import { ThemeProvider } from "@mui/material";
import CookieController from "../../api/common/cookie.controller";
import TestController from "../../api/common/test.controller";
import theme from '../../theme/theme';

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export const TestImage = () => {
    return (
        <ThemeProvider theme={theme}>
            <button onClick={login}>
                Login
            </button>

            <button onClick={sendTestRequest}>
                Send test request
            </button>
        </ThemeProvider>
    );
}

async function login() {
    const userId = 'qwe-wer-ert-rty'
    console.log('Logging in with user ID ' + userId)
    CookieController.setCookie({
        cookieName: 'userId', cookieValue: userId
        , expirationDays: 14
    })
}

async function sendTestRequest() {
    const a = await TestController.testAxios({ testParams: 'this is a test param' })
    console.warn('Response retrieved : ' + a)
}

