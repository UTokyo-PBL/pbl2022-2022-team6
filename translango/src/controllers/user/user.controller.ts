import axios from "axios";

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
  // 3.- TESTED
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
    const axiosResponse = await axios
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
  // 3.- TESTED
  static async login({ email, password }: { email: string; password: string }) {
    // Call the AXIOS request
    const axiosResponse = await axios
      .post(
        "/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Origin": "*" },
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
  // 1.- TESTED
  static async logout() {
    // Call the AXIOS request
    const axiosResponse = await axios.post("/user/logout", {}).catch((e) => {
      const JSONError = e.toJSON();
      return JSONError;
    });

    return axiosResponse;
  }

  // ---------> GET : user profile - retrieve user profile
  // ROUTE: /user/profile
  // COMMENTS:
  // 1.- TESTED, but failed due to cookie not being received
  static async getUserProfile() {
    // Call the AXIOS request
    const axiosResponse = await axios
      .get("/user/profile", {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "*" },
      })
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
  // 2.- TESTED, but failed due to cookie not being received
  static async editUserProfile({
    id,
    email,
    password,
    first_name,
    middle_name,
    last_name,
    username,
    language,
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
    user_profile_pic: string;
  }) {
    // Call the AXIOS request
    const axiosResponse = await axios
      .post("/user/profile", {
        id,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        username,
        language,
        user_profile_pic,
      })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });

    return axiosResponse;
  }
}
