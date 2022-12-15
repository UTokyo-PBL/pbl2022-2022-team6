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
            <button onClick={getUserProfile}>
                Get user profile
            </button>
            <button onClick={editUserProfile}>
                Edit user profile
            </button>

            <button onClick={getPreferredLanguages}>
                Get preferred languages
            </button>
            <button onClick={updateUserPreferredLanguages}>
                Set preferred languages
            </button>
            <button onClick={getItemsForHistory
            }>
                get items the user has updated
            </button>
            <button onClick={translateObject
            }>
                test translations from image (object)
            </button>
            <button onClick={getOneItem
            }>
                Get the object you just translated
            </button>
            <button onClick={translateText
            }>
                test translations (text)
            </button>
            <button onClick={editItem}>
                Edit the object you just translated
            </button>
            <button onClick={deleteObject}>
                Delete the object you translated
            </button>

            <button onClick={getLists}>
                Get all your lists
            </button>
            <button onClick={createList}>
                Create custom list
            </button>
            <button onClick={editList}>
                Edit the custom list you created (update the id before)
            </button>
            <button onClick={getList}>
                Get one list specifying how many items (aka game start)
            </button>
            <button onClick={deleteList}>
                Remove a list
            </button>


        </ThemeProvider>
    );
}

// Please use this example to lead the development
function createUser() {
    // Step 1: Call the corresponding Controller and Method and send the required data
    UserController.registerUser({
        id: uuidv4(),
        email: 'test@test10.com',
        password: 'test',
        first_name: 'John',
        middle_name: 'J.',
        last_name: 'Doe',
        username: 'johndoe10',
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
        email: 'test@test10.com',
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
            alert('User logged out successfully')
        } else {
            alert('Something went wrong')
        }
    })
}

function getUserProfile() {
    UserController.getUserProfile().then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}


function editUserProfile() {
    UserController.editUserProfile({
        id: "980c1e69-a7d6-4877-b391-bca1df6397f7",
        email: 'test@test80.com',
        password: 'test',
        first_name: 'John',
        middle_name: 'JChanged.',
        last_name: 'Doe',
        username: 'johndoe8',
        language: 'en',
        profile_image: 'select'
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}


function getPreferredLanguages() {
    DashboardController.getPreferredLanguages().then((OpenAPIResponse) => {
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

function getItemsForHistory() {
    DashboardController.getItems().then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

let a = uuidv4();
function translateObject() {
    a = uuidv4();
    DashboardController.translateImageFromUrl({
        id: a ,
        type: 'object',
        image_url: "https://dime.jp/genre/files/2020/11/44817f7cc02f549d516a94cc2710c53f.png",
        original: {"id":uuidv4(), "language":"en"},
        target: [{"id":uuidv4(), "language": "ja"}]
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function getOneItem() {
    DashboardController.getOneItem({
        id: a,
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

let b = uuidv4();
function translateText() {
    DashboardController.translateImageFromUrl({
        id: b,
        type: 'text',
        original: { "id": uuidv4(), "language": "en", "text": "cat" },
        target: [{ "id": uuidv4(), "language": "ja" }]
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function editItem() {
    DashboardController.editItem({
        id: b,
        caption: 'the cake is a lie',
        num_failures: 10,
        original: { "id": "5c81a2c7-7075-4e61-9e22-897792d62510", "text": "猫", "language": "zh" },
        liked: true,
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function deleteObject() {
    DashboardController.deleteOneItem({
        id: '8d5eeaff-654d-4cde-a075-07d2a04c26be',
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function getLists() {
    DashboardController.getLists().then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function createList() {
    DashboardController.createList({
        id : uuidv4(),
        icon_name : 'US',
        name : 'mytestlist',
        objects : [{"id":"8d5eeaff-654d-4cde-a075-07d2a04c26be"}]
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function editList() {
    DashboardController.editList({
        id : "f9c5565c-85a9-4de6-b96f-0f9171b64e6d",
        icon_name : 'all',
        name : 'thischanges',
        objects : [{"id":"8d5eeaff-654d-4cde-a075-07d2a04c26be"}]
    }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function getList() {
    DashboardController.getList({ id: '980c1e69-a7d6-4877-b391-bca1df6397f7', num_questions: 2 }).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}

function deleteList() {
    DashboardController.deleteList({ id: 'f9c5565c-85a9-4de6-b96f-0f9171b64e6d'}).then((OpenAPIResponse) => {
        console.log(OpenAPIResponse)
    })
}
