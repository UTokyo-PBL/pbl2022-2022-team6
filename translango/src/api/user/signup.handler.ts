import { $axios } from "../../constants/common/axios.constants";
import { SIGNUP_ENDPOINTS } from "../../constants/user/signup.constants";
import { userType } from "../../types/common/database.types";

/*
    Description: Handler for managing the account creation
*/

export default class SignupController {
  /*
        Description: Sends the data of a new user and retrieves a success or failure code
        Usage example> 
            @createUser = 'SignupController.createUser ({user : {OBJECT}})'
        Expected inputs:
            - user: userType
        Expected output:
            - number (204 success, 401 expired confirmation email, 409 already exists)
    */

  static async createUser({ user }: { user: userType }) {
    // REVIEWED
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.post(
      SIGNUP_ENDPOINTS.CREATE_USER.url,
      {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        language: user.language,
      }
    );

    // Return the status code as response (204 success, 401 expired confirmation email, 409 already exists)
    return axiosResponse.status;
  }

  /*
        Description: Update a given user's data
        Usage example> 
            @updateUser = 'SignupController.updateUser ({email: user@test.com, password:'myrawpassword'})'
        Expected inputs:
            - user: userType
        Expected output:
            - updatedUser : userType 
    */

  static async updateUser({ user }: { user: userType }) {
    // REVIEWED
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.post(
      SIGNUP_ENDPOINTS.MODIFY_USER.url,
      {
        user,
      }
    );

    // Check the response
    if (
      !SIGNUP_ENDPOINTS.MODIFY_USER.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { updatedUser } = await axiosResponse.json();
    return updatedUser as userType;
  }
}
