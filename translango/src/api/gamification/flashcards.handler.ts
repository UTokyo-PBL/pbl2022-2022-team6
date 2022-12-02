import { objectType } from './../../types/common/database.types';
import { AXIOS } from "../../constants/common/axios.constants";
import { GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS } from "../../constants/gamification/flashcards.constants";
import { axiosResponse } from "../../types/common/axios.types";
import { gamificationFlashcardOutcomeType } from "../../types/gamification/flashcards.types";

/*
    Description: Handler for managing gamification by flashcards
*/

export default class FlashCardsController {
  /*
        Description: Request a series of at most N random objects from database for gamification purposes
        Usage example> 
            @onGameStart = FlashCardsController.getNObjectsFromDatabase ({amountOfItems: 10})'
        Expected inputs:
            - amountOfItems: Number
        Expected output:
            - objects : objectType []
    */

  static async getNObjectsFromDatabase({
    amountOfItems,
  }: {
    amountOfItems: number;
  }) {
    // Send the request via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS
        .GET_CARDS_FOR_GAMIFICATION_BY_FLASHCARDS.url,
      {
        amountOfItems,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS
        .GET_CARDS_FOR_GAMIFICATION_BY_FLASHCARDS.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }

    const { objects } = axiosResponse.body;
    return objects as objectType[];
  }

  /*
        Description: Store the outcome of a certain game (by flashcards)
        Usage example> 
            @onGameEnd = 'FlashCardsController.setGameResult ({outcome: gamificationFlashcardOutcomeType})'
        Expected inputs:
            - outcome: gamificationFlashcardOutcomeType
        Expected output (NONE)
    */

  static async setGameResult({
    outcome,
  }: {
    outcome: gamificationFlashcardOutcomeType;
  }) {
    // Send the request via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS
        .SET_GAME_OUTCOME_FOR_GAMIFICATION_BY_FLASHCARDS.url,
      {
        outcome,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS
        .SET_GAME_OUTCOME_FOR_GAMIFICATION_BY_FLASHCARDS.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }
  }
}
