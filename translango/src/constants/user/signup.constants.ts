/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const SIGNUP_ENDPOINTS: endpointsType = {
  CREATE_USER: {
    description: "Endpoint for creating a new user",
    url: "/user/signup",
    statusCodes: {
      success: [204].concat(COMMON_STATUS_CODES.success),
      failure: COMMON_STATUS_CODES.failure,
    },
  },
  // TODO: Set the entrypoint URL
  MODIFY_USER: {
    description: "Endpoint for creating a new user",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: COMMON_STATUS_CODES.failure,
    },
  },
};
