import { itemType } from "../../types/common/database.types";
import { ITEMS_ENDPOINTS } from "../../constants/social/item.constants";
import { $axios } from "../../constants/common/axios.constants";

/*
    Description: Handler for getting data related to posts  from user
*/

export default class ItemController {
  /*
        Description: Retrieves a certain amount of items. Filters can be applied to reduce the resulting response
        Usage example> 
            @getItems = 'SocialSelfController.getItems ({fromSelf: true, take: 10, position : {lat: <some number>: lon: <some number>}})'
        Expected inputs
          - key : string (any keyword required for the information to be retrieved),
          - offset : number (how many shall be skipped?)
          - limit : number (how many shall be taken?)
        Expected output:
            - data : itemType[]
            - total : number
            - has_next : boolean
            - next_page_url : string (what should be the next page's url?)
    */

  static async getItems({
    // REVIEWED
    key,
    offset,
    limit,
  }: {
    key: string;
    offset: number;
    limit: number;
  }) {
    // Send the request via AXIOS
    const axiosResponse: Response = await $axios.get(
      ITEMS_ENDPOINTS.GET_ITEMS.url,
      {
        params: {
          key,
          offset,
          limit,
        },
      }
    );

    // Check the response
    if (
      !ITEMS_ENDPOINTS.GET_ITEMS.statusCodes!.success?.includes(
        axiosResponse.status
      )
    ) {
      throw new Error("Invalid status code");
    }

    // Get the items to retrieve
    const { data, total, has_next, next_page_url } = await axiosResponse.json();
    return { data, total, has_next, next_page_url } as { data : itemType[], total : number, has_next : boolean, next_page_url : string};
  }
}
