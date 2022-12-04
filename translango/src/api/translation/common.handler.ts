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

  /*
        Description: Takes a reference to the input DOM item and uploads image to the server
        Usage example> 
            @onFileSelected = 'CommonTranslationController.uploadImageToServer ({input : document.querySelector('#file')})'
        Expected inputs:
            - input: HTMLInputElement
        Expected output:
            - url : url to the stored image
    */

  static async uploadImageToServer({ input }: { input: HTMLInputElement }) {
    // Set an object to append the received image
    const formData = new FormData();
    formData.append("image", input.files!.length > 0 ? input.files![0] : "");

    // Send the image via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      TRANSLATION_COMMON_ENDPOINTS.IMAGE_UPLOAD.url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      TRANSLATION_COMMON_ENDPOINTS.IMAGE_UPLOAD.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { url } = axiosResponse.body;
    return url as string;
  }
}
