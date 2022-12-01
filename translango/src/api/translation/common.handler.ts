import { TRANSLATION_COMMON_ENDPOINTS } from "./../../constants/translation/common.constants";
import { languageType } from "./../../types/common/database.types";
import { axiosResponse } from "../../types/common/axios.types";
import { AXIOS } from "../../constants/common/axios.constants";

/*
    Description: Handler for managing common actions for translation
*/

export default class CommonTranslationController {
  /*
        Description: Retrieves the available list of languages and their codes
        Usage example> 
            @onGetAvailableLanguagesForTranslation = 'CommonTranslationController.getAvailableLanguages ()'
        Expected inputs (NONE)
        Expected output:
            - languages : languageType []
    */

  static async getAvailableLanguages() {
    // Send the request via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.get(
      TRANSLATION_COMMON_ENDPOINTS.GET_AVAILABLE_LANGUAGES.url
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      TRANSLATION_COMMON_ENDPOINTS.GET_AVAILABLE_LANGUAGES.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { languages } = axiosResponse.body;
    return languages as languageType[];
  }
}
