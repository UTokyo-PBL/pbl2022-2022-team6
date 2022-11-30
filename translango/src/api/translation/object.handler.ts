import { axiosResponse } from './../../types/common/axios.types';
import { AXIOS, ENDPOINTS } from './../../constants/common/axios.constants';
import FormData from 'form-data'

/*
    Description: Handler for managing the object detection and translation
*/

export default class ObjectController {
   /*
        Caller: /api/recognize-object
        Description: 
        Expected inputs:
            - input: HTMLInputElement
        Expected output:
            - object : objectType
    */

    static async uploadImageToServer (input: HTMLInputElement){
        // Set an object to append the received image
        const formData = new FormData();
        formData.append("image", input.files!.length > 0 ? input.files![0] : '');

        // Send the image via AXIOS
        const axiosResponse : axiosResponse = await AXIOS.post(
            ENDPOINTS.translate.OBJECT_UPLOAD.url, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        // Check the response 
        if (axiosResponse.statusCode !== ENDPOINTS.translate.OBJECT_UPLOAD.statusCodes.success){
            throw new Error('Invalid status code');
        }

        const { object } =  axiosResponse.body
        return object
    }
}