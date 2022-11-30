import { AXIOS } from "../../constants/common/axios.constants";
import { TRANSLATION_TEXT_ENDPOINTS } from "../../constants/translation/text-translation.constants";

/*
    Description: Handler for managing the object detection and translation
*/

export default class TextTranslationController {
  /*
        Description: Sends some text, the original language and a target language to be translated
        Usage example> 
            @onButtonClicked = 'TextTranslationController.translateText ({text: 'some text', fromLang: 'en', toLang: 'sp'})'
        Expected inputs:
            - text: HTMLInputElement
            - fromLang : string 
            - toLang : string 
        Expected output:
            - RESPONSE FROM RESTFULL API -> https://cloud.google.com/translate
    */

  static async translateText({
    text,
    fromLang,
    toLang,
  }: {
    text: string;
    fromLang: string;
    toLang: string;
  }) {
    // Set the adequate translation API
    let url = TRANSLATION_TEXT_ENDPOINTS.TEXT_TRANSLATE.url;
    url += "&q=" + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    // Send the image via AXIOS
    const googleResponse = await AXIOS.get(url);

    // Return the result
    return googleResponse;
  }
}
