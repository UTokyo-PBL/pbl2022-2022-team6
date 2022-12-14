import axiosInstance from "../../constants/common/axios.constants";
import instance from "../../constants/common/axios.constants";

// --------->>> MAIN CLASS
export default class UserController {
  // ---------> GET: signup page - list available languages
  // ROUTE: /user/signup
  // COMMENTS :
  // 1.- Skipped as FE will manage this

  // ---------> POST : signup - register user
  // ROUTE: /user/signup
  // COMMENTS :
  // 1.- ID is not included in the OpenAPI schema, but
  // 2.- Response code 401 is kinda misleading. Maybe it should be put in the login function?
  // 3.- TESTED & CONNECTED
  static async registerUser({
    id,
    email,
    password,
    first_name,
    middle_name,
    last_name,
    username,
    language,
  }: {
    id: string;
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    language: string;
  }) {
    // Call the AXIOS request
    const axiosResponse = await axiosInstance
      .post("/user/signup", {
        id,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        username,
        language,
      })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });

    return axiosResponse;
  }

  // ---------> POST : login - submit email & password
  // ROUTE: /user/login
  // COMMENTS:
  // 1.- Should there be a responseCode for unconfirmed email?
  // 2.- Please check if cookie is being set. Else, consider sending it back as part of the body response setting it manually
  // 3.- TESTED & CONNECTED
  static async login({ email, password }: { email: string; password: string }) {
    // Call the AXIOS request
    const axiosResponse = await instance
      .post(
        "/user/login",
        {
          email,
          password,
        }
      )
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });

    return axiosResponse;
  }

  // ---------> POST : login - submit email & password
  // ROUTE: /user/logout
  // COMMENTS:
  // 1.- TESTED & CONNECTED
  static async logout() {
    // Call the AXIOS request
    const axiosResponse = await axiosInstance.post("/user/logout", {}).catch((e) => {
      const JSONError = e.toJSON();
      return JSONError;
    });

    return axiosResponse;
  }

  // ---------> GET : user profile - retrieve user profile
  // ROUTE: /user/profile
  // COMMENTS:
  // 1.- TESTED & CONNECTED
  static async getUserProfile() {
    // Call the AXIOS request
    const axiosResponse = await axiosInstance
      .get("/user/profile")
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> POST : edit user profile - edit user profile
  // ROUTE: /user/profile
  // COMMENTS:
  // 1.- Added the user_profile_pic property on the expected response
  // 2.- TESTED & CONNECTED
  static async editUserProfile({
    id,
    email,
    password,
    first_name,
    middle_name,
    last_name,
    username,
    language,
    profile_image
  }: {
    id: string;
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    language: string;
    profile_image: string
  }) {
    // Call the AXIOS request
    const axiosResponse = await axiosInstance
      .post("/user/profile", {
        id,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        username,
        language,
        profile_image
      })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });

    return axiosResponse;
  }
}
