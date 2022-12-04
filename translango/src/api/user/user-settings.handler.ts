import { languageType } from "./../../types/common/database.types";
import { AXIOS } from "../../constants/common/axios.constants";
import { axiosResponse } from "../../types/common/axios.types";
import { ISO639_1LanguageCodeType } from "../../types/common/common.types";
import { USER_SETTINGS_ENDPOINTS } from "../../constants/user/user-settings.constants";

/*
    Description: Handler for managing the user's preferences and settings
*/

export default class UserSettingsController {
  /*
        Description: Get the user's preferred language list from database
        Usage example> 
            @getPreferredLanguages = 'UserSettingsController.getPreferredLanguages ()'
        Expected inputs: (NONE)
        Expected output:
           - preferredLanguages: languageType[]
    */

  static async getPreferredLanguages() {
    // Send the request via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.get(
      USER_SETTINGS_ENDPOINTS.SET_PREFERRED_LANGUAGES.url
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      USER_SETTINGS_ENDPOINTS.SET_PREFERRED_LANGUAGES.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    // Set the response
    const { preferredLanguages } = axiosResponse.body;
    return preferredLanguages as languageType[];
  }

  /*
        Description: Updates the prefered languages of the user
        Usage example> 
            @updatePreferredLanguages = 'UserSettingsController.updatePreferredLanguages ({languages : ISO639_1LanguageCodeType[]})'
        Expected inputs:
            - languages: ISO639_1LanguageCodeType[]
        Expected output (NONE)
    */

  static async updatePreferredLanguages({
    languages,
  }: {
    languages: ISO639_1LanguageCodeType[];
  }) {
    // Send the request via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      USER_SETTINGS_ENDPOINTS.SET_PREFERRED_LANGUAGES.url,
      {
        languages,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      USER_SETTINGS_ENDPOINTS.SET_PREFERRED_LANGUAGES.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }
  }
}
