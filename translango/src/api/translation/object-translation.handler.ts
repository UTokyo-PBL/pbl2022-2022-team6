import { objectType } from "../../types/common/database.types";
import { axiosResponse } from "../../types/common/axios.types";
import { AXIOS } from "../../constants/common/axios.constants";
import FormData from "form-data";
import { TRANSLATION_OBJECT_ENDPOINTS } from "../../constants/translation/object-translation.constants";

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
      TRANSLATION_OBJECT_ENDPOINTS.OBJECT_UPLOAD.url,
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
      TRANSLATION_OBJECT_ENDPOINTS.OBJECT_UPLOAD.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { object } = axiosResponse.body;
    return object as objectType;
  }
}
