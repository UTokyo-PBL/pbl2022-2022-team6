import { $axios } from "../../constants/common/axios.constants";
import { SIGNUP_ENDPOINTS } from "../../constants/user/signup.constants";

/*
    Description: Handler for managing the account creation
*/

export default class SignupController {
  /*
        Description: Sends the data of a new user and retrieves a success or failure code
        Usage example> 
            @createUser = 'SignupController.createUser ({email: user@test.com, password:'myrawpassword'})'
        Expected inputs:
            - email: number
            - password: string
        Expected output:
            - caseDescription : CREATED | ALREADY_EXISTS | INVALID_INFO
    */

  static async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.post(
      SIGNUP_ENDPOINTS.CREATE_USER.url,
      {
        email,
        password,
      }
    );

    // Check the response
    if (
      !SIGNUP_ENDPOINTS.CREATE_USER.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Check the response from the server
    const { caseDescription } = await axiosResponse.json();
    return caseDescription as "CREATED" | "ALREADY_EXISTS" | "INVALID_INFO";
  }
}
