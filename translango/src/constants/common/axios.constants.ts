
/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";


// --------->>> INSTANCES
//INSTANCES: Axios instance
export const AXIOS = require('axios');

// INSTANCES: Generic responseCodes
export const COMMON_STATUS_CODES = {
    success : 200,
    failure: 400
}

//INSTANCES: All the entrypoints for https requests
export const ENDPOINTS : endpointsType = {
    translate: {
        OBJECT_UPLOAD : {
            description: 'Endpoint for image upload',
            url: '/<setithere>',
            statusCodes : {
                success : COMMON_STATUS_CODES.success,
                failure : [COMMON_STATUS_CODES.failure]
            }
        }
    }
}
