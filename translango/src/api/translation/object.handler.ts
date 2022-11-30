import { objectType } from "./../../types/common/database.types";
import { axiosResponse } from "./../../types/common/axios.types";
import { AXIOS } from "./../../constants/common/axios.constants";
import FormData from "form-data";
import { TRANSLATION_ENDPOINTS } from "../../constants/translation/axios.constants";

/*
    Description: Handler for managing the object detection and translation
*/

export default class ObjectController {
  /*
        Description: Takes a reference to the input DOM item and uploads image to the server
        Usage example> 
            @onFileSelected = 'ObjectController.uploadImageToServer ({input : document.querySelector('#file')})'
        Expected inputs:
            - input: HTMLInputElement
        Expected output:
            - object : objectType
    */

  static async uploadImageToServer({ input }: { input: HTMLInputElement }) {
    // Set an object to append the received image
    const formData = new FormData();
    formData.append("image", input.files!.length > 0 ? input.files![0] : "");

    // Send the image via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      TRANSLATION_ENDPOINTS.OBJECT_UPLOAD.url,
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
      TRANSLATION_ENDPOINTS.OBJECT_UPLOAD.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { object } = axiosResponse.body;
    return object;
  }

  /*
        Description: Upload the data on a register @ the object table @ database
        Usage example> 
            @onUpdateRequested = 'ObjectController.updateObject ({objectId : 'jfsdwer', object : OBJECT})'
        Expected inputs:
            - objectId : string,
            - object : objectType,
        Expected output:
    */

  static async updateObject({
    objectId,
    object,
  }: {
    objectId: string;
    object: objectType;
  }) {
    // Send the new information via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      TRANSLATION_ENDPOINTS.OBJECT_UPDATE.url,
      {
        objectId,
        object,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      TRANSLATION_ENDPOINTS.OBJECT_UPDATE.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }
  }

  /*
        Description: Sends some text, the original language and a target language to be translated
        Usage example> 
            @onButtonClicked = 'ObjectController.translateText ({text: 'some text', fromLang: 'en', toLang: 'sp'})'
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
    let url = TRANSLATION_ENDPOINTS.TEXT_TRANSLATE.url;
    url += "&q=" + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    // Send the image via AXIOS
    const googleResponse = await AXIOS.get(url);

    // Return the result
    return googleResponse;
  }
}
