import { $axios } from "../../constants/common/axios.constants";
import { TEST_ENDPOINTS } from "../../constants/common/test.constants";

/*
    Description: Handler for handling social interactions between users
*/

export default class TestController {
  /*
        Description: Creates a test request (no params, no response expected)
        Usage example> 
            @onFollowButtonClicked = 'TestController.testAxios ({testParams : any})'
        Expected inputs:
            - testParams : any
        Expected output: 
            - outcome : booleanb
    */

  static async testAxios({ testParams }: { testParams: any }) {
    // Send the new information via AXIOS
    const axiosResponse: Response = await $axios.post(
      TEST_ENDPOINTS.TEST.url,
      {
        testParams,
      }
    );

    // Return the response
    return axiosResponse;
  }
}
