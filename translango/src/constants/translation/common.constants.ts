/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const TRANSLATION_COMMON_ENDPOINTS: endpointsType = {
  // TODO: Set the entrypoint URL
  GET_AVAILABLE_LANGUAGES: {
    description: "Endpoint for image upload",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },
};
