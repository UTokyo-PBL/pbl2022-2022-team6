import { ThemeProvider } from "@mui/material";
import UserController from "../../controllers/user/user.controller";
import theme from '../../theme/theme';
import { v4 as uuidv4 } from 'uuid';
import { RESPONSE_STATUS_CODES } from "../../constants/common/axios.constants";
import DashboardController from "../../controllers/dashboard/dashboard.controller";

// background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
export const TestImage = () => {
    return (
        <ThemeProvider theme={theme}>
            <button onClick={createUser}>
                CreateUser
            </button>
            <button onClick={login}>
                Login
            </button>
            <button onClick={logout}>
                Logout
            </button>
            <button onClick={listCookies}>
                See cookies
            </button>
            <button onClick={getUserProfile}>
                Get user profile
            </button>
            <button onClick={editUserProfile}>
                Edit user profile
            </button>

            <button onClick={updateUserPreferredLanguages}>
                Set preferred languages
            </button>
            <button onClick={getList}>
               Get list
            </button>

        </ThemeProvider>
    );
}

// Please use this example to lead the development
function createUser() {
    // Step 1: Call the corresponding Controller and Method and send the required data
    UserController.registerUser({
        id: uuidv4(),
        email: 'test@test8.com',
        password: 'test',
        first_name: 'John',
        middle_name: 'J.',
        last_name: 'Doe',
        username: 'johndoe8',
        language: 'en',
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
        // Step 2: Manage the response according to OpenAPI schema
        if (OpenAPIResponse.status !== undefined && OpenAPIResponse.status === 200) {
            alert('User created successfully')

            // Usually if the OpenAPIResponse.status value is undefined or not 200, there was an error. 
        } else {
            alert('Something went wrong with code ' + OpenAPIResponse.status + ' wich means ' + RESPONSE_STATUS_CODES[OpenAPIResponse.status])
        }
    })
}

function login() {
    UserController.login({
        email: 'test@test8.com',
        password: 'test'
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
        // Manage the response according to OpenAPI schema
        if (OpenAPIResponse.status === 200) {
            alert('User logged successfully')
        } else {
            alert('Something went wrong')
        }
    })
}

function logout() {
    UserController.logout().then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
        // Manage the response according to OpenAPI schema
        if (OpenAPIResponse.status === 200) {
            alert('User logged successfully')
        } else {
            alert('Something went wrong')
        }
    })
}


function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i - 1] + "\n";
    }
    console.log(aString);
}


function getUserProfile() {
    UserController.getUserProfile().then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}


function editUserProfile() {
    UserController.editUserProfile({
        id: uuidv4(),
        email: 'test@test8.com',
        password: 'test',
        first_name: 'John',
        middle_name: 'J.',
        last_name: 'Doe',
        username: 'johndoe8',
        language: 'en',
        user_profile_pic: 'myurl',
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function updateUserPreferredLanguages() {
    DashboardController.updateUserPreferredLanguages({
        languages: ['en', 'jp'],
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function getList() {
    DashboardController.getList({ id: uuidv4(), num_questions: 2 }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}
