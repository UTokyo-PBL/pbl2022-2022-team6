import { objectType, userType } from "./../../types/common/database.types";
import { POST_ENDPOINTS } from "../../constants/social/post.constants";
import { $axios } from "../../constants/common/axios.constants";

/*
    Description: Handler for getting data related to posts  from user
*/

export default class PostController {
  /*
        Description: Retrieves a certain amount of posts. Filters can be applied to reduce the resulting response
        Usage example> 
            @getSelfPosts = 'SocialSelfController.getPosts ({fromSelf: true, take: 10, position : {lat: <some number>: lon: <some number>}})'
        Expected inputs
          - source? : 'SELF' | 'NOT_FOLLOWING' | 'FOLLOWING' | 'ALL' = 'SELF' -> Defines the origin from where the posts will be displayed
            - SELF => Only user's posts are displayed (default)
            - NOT_FOLLOWING => Only user's not-following account's posts are displayed
            - FOLLOWING => Only user's following account's posts are displayed
            - ALL => All shown
          - take? : number -> Indicates the amount of maximum items expected to be received
          - position : {lat: number, lng: number} -> Expresses the central location from where the user expects to see posts
          - diameter? : number -> Indicates in kilometers how far the posts should be looked for
        Expected output:
            - posts : {user : userType,  objects : objectType[]}[]
    */

  static async getPosts({
    source = "SELF",
    take,
    position,
    diameter,
  }: {
    source?: "SELF" | "NOT_FOLLOWING" | "FOLLOWING" | "ALL";
    take?: number;
    position: { lat: number; lng: number };
    diameter?: number;
  }) {
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.post(
      POST_ENDPOINTS.GET_POSTS.url,
      {
        source,
        take,
        position,
        diameter,
      }
    );

    // Check the response
    if (
      !POST_ENDPOINTS.GET_POSTS.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { posts } = await axiosResponse.json();
    return posts as { user: userType; objects: objectType[] }[];
  }

  /*
        Description: Update the data on a register @ the object table @ database
        Usage example> 
            @onUpdateRequested = 'PostController.updatePost ({object : OBJECT})'
        Expected inputs:
            - object : objectType,
        Expected output (NONE)
    */

  static async updatePost({ object }: { object: objectType }) {
    // Send the new information via AXIOS
    const axiosResponse: Response = await $axios.post(
      POST_ENDPOINTS.POST_UPDATE.url,
      {
        object,
      }
    );

    // Check the response
    if (
      !POST_ENDPOINTS.POST_UPDATE.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }
  }

  /*
        Description: Remove a register @ object table @ database
        Usage example> 
            @onDeleteRequested = 'PostController.deletePost ({object : OBJECT})'
        Expected inputs:
            - object : objectType,
        Expected output (NONE)
    */

  static async deletePost({ object }: { object: objectType }) {
    // Send the new information via AXIOS
    const axiosResponse: Response = await $axios.post(
      POST_ENDPOINTS.POST_DELETE.url,
      {
        object,
      }
    );

    // Check the response
    if (
      !POST_ENDPOINTS.POST_DELETE.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }
  }
}
