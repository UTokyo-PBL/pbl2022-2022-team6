import { languageType } from './../../types/common/database.types';
import { axiosResponse } from "./../../types/common/axios.types";
import { AXIOS } from "../../constants/common/axios.constants";
import { TRANSLATION_TEXT_ENDPOINTS } from "../../constants/translation/text-translation.constants";
import { ISO639_1LanguageCodeType } from "../../types/common/common.types";
import { translationType } from "../../types/translation/common.types";

/*
    Description: Handler for managing the text translation
*/

export default class TextTranslationController {
  /*
        Description: Sends a URL to the database for text identification
        Usage example> 
            @onTextTranslation = 'TextTranslationController.getTextFromURL ({url: 'www.myurl.com/image.jpg'})'
        Expected inputs:
            - url : string
            - targetLanguage : ISO639_1LanguageCodeType referring to the system's language
        Expected output:
            - detectedText : Identifyied text from the image. No database storage is required from etxt detection.
            - translationOnRequestedLanguage : string containing the translation to the user's system language
    */

  static async getTextFromURL({
    url,
    targetLanguage,
  }: {
    url: String;
    targetLanguage: ISO639_1LanguageCodeType;
  }) {
    // Send the referred URL to axios
    const axiosResponse: axiosResponse = await AXIOS.post(
      TRANSLATION_TEXT_ENDPOINTS.TEXT_RECOGNITION.url,
      {
        url,
        targetLanguage,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      TRANSLATION_TEXT_ENDPOINTS.TEXT_RECOGNITION.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { detectedText, translationOnRequestedLanguage } = axiosResponse.body;
    return { detectedText, translationOnRequestedLanguage } as {
      detectedText: string;
      translationOnRequestedLanguage: string;
    };
  }

  /*
        Description: Translates a given text to the preferred languages of the user
        Usage example> 
            @onSimpleTextTranslation = 'TextTranslationController.translateToPreferredLanguages ({text: 'Hola!', preferredLanguages:ARRAY})'
        Expected inputs:
            - text : string
            - preferredLanguages : Array of preferred languages obtained using the UserSettingsController.getPreferredLanguages method.
        Expected output:
            - translations : Identifyied text from the image. No database storage is required from text detection.
    */

  static async translateToPreferredLanguages({
    text,
    preferredLanguages,
  }: {
    text: String;
    preferredLanguages: languageType;
  }) {
    // Send the referred URL to axios
    const axiosResponse: axiosResponse = await AXIOS.post(
      TRANSLATION_TEXT_ENDPOINTS.TEXT_RECOGNITION.url,
      {
        text,
        preferredLanguages,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      TRANSLATION_TEXT_ENDPOINTS.TEXT_RECOGNITION.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { translations } = axiosResponse.body;
    return { translations } as {
      translations: translationType;
    };
  }
}
