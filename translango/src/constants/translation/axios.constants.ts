import { GOOGLE_TRANSLATE_API_KEY } from './../common/google.constants';
/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const TRANSLATION_ENDPOINTS: endpointsType = {
  // TODO: Set the entrypoint URL
  OBJECT_UPLOAD: {
    description: "Endpoint for image upload",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },

  // TODO: Set the entrypoint URL
  OBJECT_UPDATE: {
    description: "Endpoint for updating a register on the object's table",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },
  TEXT_TRANSLATE: {
    description: "Endpoint for RESTful requests to GOOGLE's translation api",
    url: `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
  }
};
