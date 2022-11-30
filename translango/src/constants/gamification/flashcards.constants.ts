/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS: endpointsType = {
  // TODO: Set the entrypoint URL
  GET_CARDS_FOR_GAMIFICATION_BY_FLASHCARDS: {
    description: "Endpoint for obtaining a certain amount of objects from database",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },

  // TODO: Set the entrypoint URL
  SET_GAME_OUTCOME_FOR_GAMIFICATION_BY_FLASHCARDS: {
    description: "Endpoint for obtaining a certain amount of objects from database",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: [COMMON_STATUS_CODES.failure],
    },
  },
};
