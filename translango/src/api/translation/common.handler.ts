import { locationType } from "./../../types/common/common.types";
import { TRANSLATION_COMMON_ENDPOINTS } from "./../../constants/translation/common.constants";
import {
  itemType,
  languageType,
  listType,
} from "./../../types/common/database.types";
import { $axios } from "../../constants/common/axios.constants";

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
    const axiosResponse: Response = await $axios.get(
      TRANSLATION_COMMON_ENDPOINTS.GET_AVAILABLE_LANGUAGES.url
    );

    // Check the response
    if (
      !TRANSLATION_COMMON_ENDPOINTS.GET_AVAILABLE_LANGUAGES.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { languages } = await axiosResponse.json();
    return languages as languageType[];
  }

  /*
        Description: Retrieves the available list and their content
        Usage example> 
            @onRequestLists = 'CommonTranslationController.getAvailableLists ()'
        Expected inputs (NONE)
        Expected output:
            - data : listType []
            - total : number
    */

  static async getAvailableLists() // REVIEWED
  {
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.get(
      TRANSLATION_COMMON_ENDPOINTS.AVAILABLE_LISTS.url
    );

    // Check the response
    if (
      !TRANSLATION_COMMON_ENDPOINTS.AVAILABLE_LISTS.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { data, total } = await axiosResponse.json();
    return { data, total } as { data: listType[]; total: number };
  }

  /*
        Description: Sends a URL to the database for object/text identification
        Usage example>
            @onObjectTranslation = 'CommonTranslationController.detectFromImage ({type: 'text', image_url: 'www...', location: {longitude:XXXX, latitude:XXXX}, preferred_language:{code:'en'}})'
        Expected inputs:
            - type : 'text' or 'object'
            - image_url: url of the image previously uploaded to S3
            - location : latitude and longitude of the taken image
            - preferred_language
        Expected output:
            - detectedObjects : Detected items (objects or text) are stored in database and then retrieved as DB entries to frontend 
    */

  static async detectFromImage({
    type,
    image_url,
    location,
    city,
    country,
    preferred_language,
  }: {
    type: "object" | "text";
    image_url: string;
    location: locationType;
    city: string;
    country: string;
    preferred_language: languageType;
  }) {
    // Send the referred URL to axios
    const axiosResponse: Response = await $axios.post(
      TRANSLATION_COMMON_ENDPOINTS.IMAGE_RECOGNITION.url,
      {
        image_url,
        location,
        city,
        country,
        preferred_language,
      },
      {
        params: {
          type,
        },
      }
    );

    // Check the response
    if (
      !TRANSLATION_COMMON_ENDPOINTS.IMAGE_RECOGNITION.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { detectedObjects } = await axiosResponse.json();
    return detectedObjects as itemType;
  }

  /*
        Description: Updates the values of a given item
        Usage example>
            @onObjectUpdate = 'CommonTranslationController.updateItemFromId ({item : ITEM})'
        Expected inputs:
            - item : itemType (please keep the id intact so reference to the original one can be made)
        Expected output:
            - updatedItem :itemType  (Updated item)
    */

  static async updateItem({ item }: { item: itemType }) {
    // Send the referred URL to axios
    const axiosResponse: Response = await $axios.post(
      TRANSLATION_COMMON_ENDPOINTS.UPDATE_ITEM.url,
      {
        item,
      }
    );

    // Check the response
    if (
      !TRANSLATION_COMMON_ENDPOINTS.UPDATE_ITEM.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { updatedItem } = await axiosResponse.json();
    return updatedItem as itemType;
  }
}