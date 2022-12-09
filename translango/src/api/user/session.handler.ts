import { $axios } from "../../constants/common/axios.constants";
import { SESSION_ENDPOINTS } from "../../constants/user/session.constants";
import CookieController from "../common/cookie.handler";

/*
    Description: Handler for managing the session's logic
*/

export default class SessionController {
  /*
    Description: Send login data and retrieves a case description regarding the outcome of session creation
    Usage example> 
      @login = 'SessionController.login ({email: user@test.com, password:'myrawpassword'})'
    Expected inputs:
      - email: number
      - password: string
    Expected output:
      - userId
      - caseDescription : LOGGED | INVALID_USER | INVALID_PASSWORD | BLOCKED_ACCOUNT
    */

  static async login({ email, password }: { email: string; password: string }) {
    // REVIEWED
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.post(
      SESSION_ENDPOINTS.LOGIN.url,
      {
        email,
        password,
      }
    );

    // Check the response from the server
    const { set_cookie, message } = await axiosResponse.json();

    // If the userId is available, set it to a cookie
    if (set_cookie) {
      CookieController.setCookie({
        cookieName: "userId",
        cookieValue: set_cookie,
        expirationDays: 14,
      });
    }

    // Return a response
    return { userId: set_cookie, caseDescription: message } as {
      userId: string;
      caseDescription?:
        | "LOGGED"
        | "INVALID_USER"
        | "INVALID_PASSWORD"
        | "BLOCKED_ACCOUNT";
    };
  }

  /*
        Description: Request session destruction
        Usage example> 
            @logout = 'SessionController.logout ()'
        Expected inputs (NONE)
        Expected output (NONE)
    */

  static logout() {
    // REVIEWED
    // Remove the userId's cookie content
    CookieController.setCookie({
      cookieName: "userId",
      cookieValue: "",
      expirationDays: 0,
    });
  }
}
