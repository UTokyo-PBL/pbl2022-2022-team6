import {
  $axios,
  RESPONSE_STATUS_CODES,
} from "../../constants/common/axios.constants";

// --------->>> MAIN CLASS
export default class UserController {
  // GET: signup page - list available languages
  // -> /user/signup
  // COMMENTS :
  // 1.- Skipped as FE will manage this

  // POST : signup - register user
  // -> /user/signup
  // COMMENTS :
  // 1.- id property should be managed in BE. Maybe consider removing it?
  // 2.- Response code 401 is kinda misleading. Maybe it should be put in the login function?
  static registerUser({
    id,
    email,
    password,
    first_name,
    middle_name,
    last_name,
    username,
    preferred_language,
  }: {
    id?: string;
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    preferred_language: string[];
  }) {
    // Call the AXIOS request
    $axios
      .post("/user/signup", {
        id,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        username,
        preferred_language,
      })
      .then((axiosResponse) => {
        // Return the status code
        return RESPONSE_STATUS_CODES[axiosResponse.status];
      });
  }

  // POST : login - submit email & password
  // -> /user/login
  // COMMENTS:
  // 1.- Should there be a responseCode for unconfirmed email?
  // 2.- Please check if cookie is being set. Else, consider sending it back as part of the body response setting it manually
  static login({ email, password }: { email: string; password: string }) {
    // Call the AXIOS request
    $axios
      .post("/user/login", {
        email,
        password,
      })
      .then((axiosResponse) => {
        // Return the status code
        return RESPONSE_STATUS_CODES[axiosResponse.status];
      });
  }

  // GET : user profile - retrieve user profile
  // -> /user/profile
  // COMMENTS:
  // 1.- Added the user_profile_pic property on the expected response
  static async getUserProfile() {
    // Call the AXIOS request
    $axios.get("/user/profile").then((axiosResponse) => {
      // Return the status data contained
      const {
        id,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        username,
        language,
        preferred_language,
        user_profile_pic,
      } = axiosResponse.data;
      return {
        id,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        username,
        language,
        preferred_language,
        user_profile_pic,
      };
    });
  }

  // POST : edit user profile - edit user profile
  // -> /user/profile
  // COMMENTS:
  // 1.- Added the user_profile_pic property on the expected response
  static async editUserProfile({
    id,
    email,
    password,
    first_name,
    middle_name,
    last_name,
    username,
    language,
    preferred_language,
    user_profile_pic,
  }: {
    id: string;
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    language: string;
    preferred_language: string;
    user_profile_pic: string[];
  }) {
    // Call the AXIOS request
    $axios
      .post("/user/profile", {
        id,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        username,
        language,
        preferred_language,
        user_profile_pic,
      })
      .then((axiosResponse) => {
        // Return the status code
        return RESPONSE_STATUS_CODES[axiosResponse.status];
      });
  }
}
