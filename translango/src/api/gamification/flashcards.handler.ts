import { listType } from "./../../types/common/database.types";
import { GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS } from "../../constants/gamification/flashcards.constants";
import { gamificationFlashcardOutcomeType } from "../../types/gamification/flashcards.types";
import { $axios } from "../../constants/common/axios.constants";

/*
    Description: Handler for managing gamification by flashcards
*/

export default class FlashCardsController {
  /*
        Description: Request a series of at most N random objects from database for gamification purposes. It requires a listId which should be known in advance
        Usage example> 
            @onGameStart = FlashCardsController.getNObjectsFromDatabase ({num_questions: 10, listId : 'qwe-wer-ert'})'
        Expected inputs:
            - num_questions: Number
            - listId : string
        Expected output:
            - list : listType (Returns a list with the requested amount of items)
    */

  static async getNObjectsFromDatabase({
    // REVIEWED
    num_questions,
    listId,
  }: {
    num_questions: number;
    listId: number;
  }) {
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.get(
      GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS
        .GET_CARDS_FOR_GAMIFICATION_BY_FLASHCARDS.url +
        "/" +
        listId,
      {
        params: {
          num_questions,
        },
      }
    );

    // Check the response
    if (
      !GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS.GET_CARDS_FOR_GAMIFICATION_BY_FLASHCARDS.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { id, name, icon_name, items } = await axiosResponse.json();
    const list: listType = {
      id,
      name,
      icon_name,
      items,
    };
    return list;
  }

  /*
        Description: Store the outcome of a certain game (by flashcards)
        Usage example> 
            @onGameEnd = 'FlashCardsController.setGameResult ({outcome: gamificationFlashcardOutcomeType})'
        Expected inputs:
            - listId : 
            - outcome: gamificationFlashcardOutcomeType
        Expected output (NONE)
    */

  static async setGameResult({
    listId,
    outcome,
  }: {
    listId: number;
    outcome: gamificationFlashcardOutcomeType;
  }) {
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.post(
      GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS
        .SET_GAME_OUTCOME_FOR_GAMIFICATION_BY_FLASHCARDS.url,
      {
        listId,
        outcome,
      }
    );

    // Check the response
    if (
      !GAMIFICATION_FLASHCARDS_OBJECT_ENDPOINTS.SET_GAME_OUTCOME_FOR_GAMIFICATION_BY_FLASHCARDS.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }
  }
}
