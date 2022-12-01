import { axiosResponse } from "../../types/common/axios.types";
import { AXIOS } from "../../constants/common/axios.constants";
import { USER_ENDPOINTS } from "../../constants/social/user.constants";

/*
    Description: Handler for handling social interactions between users
*/

export default class UserSocialController {
  /*
        Description: Sets or removes a follow
        Usage example> 
            @onFollowButtonClicked = 'UserSocialController.setFollow ({targetUserId : string, actionToPerform : 'FOLLOW'})'
        Expected inputs:
            - targetUserId : string,
            - isFollow : 'FOLLOW' | 'UNFOLLOW 
        Expected output (NONE)
    */

  static async setFollow({
    targetUserId,
    isFollow,
  }: {
    targetUserId: string;
    isFollow: "FOLLOW" | "UNFOLLOW";
  }) {
    // Send the new information via AXIOS
    const axiosResponse: axiosResponse = await AXIOS.post(
      USER_ENDPOINTS.SET_FOLLOW.url,
      {
        targetUserId,
        isFollow,
      }
    );

    // Check the response
    if (
      axiosResponse.statusCode !==
      USER_ENDPOINTS.SET_FOLLOW.statusCodes!.success
    ) {
      throw new Error("Invalid status code");
    }
  }
}
