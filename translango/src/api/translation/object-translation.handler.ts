import { ISO639_1LanguageCodeType } from "./../../types/common/common.types";
import { objectType } from "./../../types/common/database.types";
import { TRANSLATION_OBJECT_ENDPOINTS } from "../../constants/translation/object-translation.constants";
import { boundingBoxType } from "../../types/translation/common.types";
import { $axios } from "../../constants/common/axios.constants";

/*
    Description: Handler for managing the object detection and translation
*/

export default class ObjectController {
  /*
        Description: Sends a URL to the database for object identification
        Usage example>
            @onObjectTranslation = 'ObjectController.getObjectFromURL ({url: 'www.myurl.com/image.jpg', targetLamguage: 'en'})'
        Expected inputs:
            - url : string
            - targetLanguage : ISO639_1LanguageCodeType referring to the system's language (this is to show a preview to the user, so it has to be the user's setted up language)
        Expected output:
            - detectedObjects : Detected objects are stored in database and then retrieved as DB entries to frontend 
            - boundingBoxes: array containing the information of the bounding boxes of each item.  boundingBoxType type
            - translationsOnRequestedLanguage : array of strings containing the translation of each object on the system's language
    */

  static async getObjectFromURL({
    url,
    targetLanguage,
  }: {
    url: String;
    targetLanguage: ISO639_1LanguageCodeType;
  }) {
    // Send the referred URL to axios
    const axiosResponse: Response = await $axios.post(
      TRANSLATION_OBJECT_ENDPOINTS.OBJECT_RECOGNITION.url,
      {
        targetLanguage,
        url,
      }
    );

    // Check the response
    if (
      !TRANSLATION_OBJECT_ENDPOINTS.OBJECT_RECOGNITION.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { detectedObjects, boundingBoxes, translationsOnRequestedLanguage } =
      await axiosResponse.json();
    return {
      detectedObjects,
      boundingBoxes,
      translationsOnRequestedLanguage,
    } as {
      detectedObjects: objectType[];
      boundingBoxes: boundingBoxType[];
      translationsOnRequestedLanguage: string[];
    };
  }
}
