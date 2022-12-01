import { SESSION_ENDPOINTS } from "../../constants/user/session.constants";
import { AXIOS } from "../../constants/common/axios.constants";
import { axiosResponse } from "../../types/common/axios.types";

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
            - caseDescription : LOGGED | INVALID_USER | INVALID_PASSWORD | BLOCKED_ACCOUNT
    */

  static async login({ email, password }: { email: string; password: string }) {
    // Send the request via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      SESSION_ENDPOINTS.LOGIN.url,
      {
        email,
        password,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !== SESSION_ENDPOINTS.LOGIN.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { caseDescription } = axiosResponse.body;
    return caseDescription as
      | "LOGGED"
      | "INVALID_USER"
      | "INVALID_PASSWORD"
      | "BLOCKED_ACCOUNT";
  }

  /*
        Description: Request session destruction
        Usage example> 
            @logout = 'SessionController.logout ()'
        Expected inputs (NONE)
        Expected output (NONE)
    */

  static async logout() {
    // Send the request via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.get(
      SESSION_ENDPOINTS.LOGOUT.url
    );

    // Check the response
    if (
      axiosResponse.statusCode !== SESSION_ENDPOINTS.LOGOUT.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }
  }
}
