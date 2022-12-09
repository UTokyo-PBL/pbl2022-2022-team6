import { userType } from "./../../types/common/database.types";
import { USER_SETTINGS_ENDPOINTS } from "../../constants/user/user-settings.constants";
import { $axios } from "../../constants/common/axios.constants";

/*
    Description: Handler for managing the user's preferences and settings
*/

export default class UserSettingsController {
  /*
        Description: Get the user's entire profile (including the preferredLanguages)
        Usage example> 
            @getInfoFromUser = 'UserSettingsController.getUserProfile ({})'
        Expected inputs: (NONE)
        Expected output:
           - user: userType
    */

  static async getUserProfile() {
    // REVIEWED
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.get(
      USER_SETTINGS_ENDPOINTS.GET_USER_INFO.url
    );

    // Check the response
    if (
      !USER_SETTINGS_ENDPOINTS.GET_USER_INFO.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Set the response
    const jsonResponse = await axiosResponse.json();
    return jsonResponse as userType[];
  }

  /*
        Description: Update the user's entire profile (including the preferredLanguages)
        Usage example> 
            @updateUserInfo = 'UserSettingsController.updateUserInfo ({ user : userType})'
        Expected inputs: 
          - user : userType
        Expected output: (NONE)
    */

  static async updateUserProfile({ user }: { user: userType }) {
    // REVIEWED
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.post(
      USER_SETTINGS_ENDPOINTS.UPDATE_USER_PROFILE.url,
      {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        language: user.language,
        preferred_languages: user.preferred_languages,
      }
    );

    // Check the response
    if (
      !USER_SETTINGS_ENDPOINTS.UPDATE_USER_PROFILE.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }
  }
}
