/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const POST_ENDPOINTS: endpointsType = {
  // TODO: Set the entrypoint URL
  GET_POSTS: {
    description:
      "Endpoint for obtaining a certain amount of objects from database",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },

  // TODO: Set the entrypoint URL
  POST_UPDATE: {
    description: "Endpoint for updating a register on the object's table",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },

  // TODO: Set the entrypoint URL
  POST_DELETE: {
    description: "Endpoint for updating a register on the object's table",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },
};
