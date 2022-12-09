/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const USER_SETTINGS_ENDPOINTS: endpointsType = {
  GET_USER_INFO: {
    description: "Endpoint for getting the info from the user",
    url: "/user/profile",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: COMMON_STATUS_CODES.failure,
    },
  },
  UPDATE_USER_PROFILE: {
    description: "Endpoint for setting a new set of values for a given user",
    url: "/user/profile",
    statusCodes: {
      success: [204].concat(COMMON_STATUS_CODES.success),
      failure: COMMON_STATUS_CODES.failure,
    },
  },
};
