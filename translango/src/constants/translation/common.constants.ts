/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const TRANSLATION_COMMON_ENDPOINTS: endpointsType = {
  GET_AVAILABLE_LANGUAGES: {
    description: "Endpoint for getting a list of available languages",
    url: "/user/signup",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: COMMON_STATUS_CODES.failure,
    },
  },
  // TODO: Set the entrypoint URL
  UPDATE_ITEM: {
    description: "Endpoint for updating an item in database",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: COMMON_STATUS_CODES.failure,
    },
  },
  IMAGE_RECOGNITION: {
    description: "Endpoint for translating an image to text",
    url: "/dashboard/histories",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: COMMON_STATUS_CODES.failure,
    },
  },
  AVAILABLE_LISTS: {
    description: "Endpoint for getting the available list of lists",
    url: "/dashboard/list",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: COMMON_STATUS_CODES.failure,
    },
  },
};
