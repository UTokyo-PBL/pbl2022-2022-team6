import {
  $axios,
  RESPONSE_STATUS_CODES,
} from "../../constants/common/axios.constants";

// --------->>> INSTANCES
type coordinate = {
  x: number;
  y: number;
};

// --------->>> MAIN CLASS
export default class DashboardController {
  // ---------> GET: dashboard/main - top - list available languages
  // ROUTE: /dashboard/top
  // COMMENTS :
  // 1.- Skipped as FE will manage this

  // ---------> POST : dashboard/main - update preferred language
  // ROUTE: /dashboard/top
  // COMMENTS :
  // 1.- Skipped as UserController.editUserProfile handles this exact task by updating the parameters 'preferred_languages' or 'language'

  // ---------> GET : dashboard/histories - list histories
  // ROUTE: /dashboard/histories
  static getItems({ key }: { key?: string }) {
    // Call the AXIOS request
    $axios
      .get("/dashboard/histories", {
        params: {
          key,
        },
      })
      .then((axiosResponse) => {
        // Return the status data contained
        const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
        const { data, total } = axiosResponse.data;
        return {
          responseCodeInfo,
          data,
          total,
        };
      });
  }

  // ---------> POST : dashboard/camera - add history (detect object or text)
  // ROUTE: /dashboard/histories
  // COMMENTS :
  // 1.- Request 'id' property should be managed in BE. Maybe consider removing it?
  // 2.- Request 'original' property should be a {language : string, text? : string} object for text translation.
  // 3.- Request 'target' property should be just an array of language codes, but on the OpenApi is not clear if that is the case. Please confirm it.
  // 4.- Response 'liked' property is misleading and could be mistaken in terms of likes received on the item. Consider changing it to isFavourite?
  static translateImageFromUrl({
    type,
    image_url,
    id,
    original,
    target,
    country,
    city,
    latitude,
    longitude,
  }: {
    type: "object" | "text";
    image_url: string;
    id?: string;
    original?: { language: string; text?: string };
    target: string[];
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  }) {
    // Call the AXIOS request
    $axios
      .post("/dashboard/histories", {
        type,
        image_url,
        id,
        original,
        target,
        country,
        city,
        latitude,
        longitude,
      })
      .then((axiosResponse) => {
        // Return the status data contained
        const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
        const {
          id,
          original,
          target,
          bbox,
          image_url,
          caption,
          country,
          city,
          latitude,
          longitude,
          liked,
          num_failures,
        } = axiosResponse.data;
        return {
          responseCodeInfo,
          id,
          original,
          target,
          bbox,
          image_url,
          caption,
          country,
          city,
          latitude,
          longitude,
          liked,
          num_failures,
        };
      });
  }

  // ---------> GET : dashboard/history - one history for object
  // ROUTE: /dashboard/histories/{objectID}
  static getOneItem({ id }: { id: string }) {
    // Call the AXIOS request
    $axios.get("/dashboard/histories/" + id).then((axiosResponse) => {
      // Return the status data contained
      const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
      const {
        id,
        original,
        target,
        bbox,
        image_url,
        caption,
        country,
        city,
        latitude,
        longitude,
        liked,
        num_failures,
      } = axiosResponse.data;
      return {
        responseCodeInfo,
        id,
        original,
        target,
        bbox,
        image_url,
        caption,
        country,
        city,
        latitude,
        longitude,
        liked,
        num_failures,
      };
    });
  }

  // ---------> POST :
  // - dashboard/history - edit liked
  // - dashboard/history - edit caption
  // - dashboard/history - edit num failures
  // - dashboard/history - edit original language
  // ROUTE: /dashboard/histories/{objectID}/edit
  // COMMENTS:
  // 1.- These functions can be compacted in one big editItem POST function. I did it below.
  // 2.- Response and request 'liked' property is misleading and could be mistaken in terms of likes received on the item. Consider changing it to isFavourite?

  // ROUTE: /dashboard/histories/{objectID}
  static editItem({
    id,
    original,
    target,
    bbox,
    image_url,
    caption,
    country,
    city,
    latitude,
    longitude,
    liked,
    num_failures,
  }: {
    id: string;
    original: { language: string; text?: string };
    target: { language: string; text?: string; sound_url?: string }[];
    bbox: {
      upper_left: coordinate;
      lower_left: coordinate;
      lower_right: coordinate;
      upper_right: coordinate;
    };
    image_url: string;
    caption: string;
    country: string;
    city: string;
    latitude: number;
    longitude: number;
    liked: boolean;
    num_failures: number;
  }) {
    // Call the AXIOS request
    $axios
      .post("/dashboard/histories/" + id + "/edit", {
        id,
        original,
        target,
        bbox,
        image_url,
        caption,
        country,
        city,
        latitude,
        longitude,
        liked,
        num_failures,
      })
      .then((axiosResponse) => {
        // Return the status data contained and the sctatus code's information
        const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
        const {
          id,
          original,
          target,
          bbox,
          image_url,
          caption,
          country,
          city,
          latitude,
          longitude,
          liked,
          num_failures,
        } = axiosResponse.data;
        return {
          responseCodeInfo,
          id,
          original,
          target,
          bbox,
          image_url,
          caption,
          country,
          city,
          latitude,
          longitude,
          liked,
          num_failures,
        };
      });
  }

  // ---------> GET : dashboard/list - lists
  // ROUTE: /dashboard/lists
  static getLists() {
    // Call the AXIOS request
    $axios.get("/dashboard/lists").then((axiosResponse) => {
      // Return the status data contained
      const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
      const { default_list, custom_lists, total } = axiosResponse.data;
      return {
        responseCodeInfo,
        default_list,
        custom_lists,
        total,
      };
    });
  }

  // ---------> POST : dashboard/list - add custom list
  // ROUTE: /dashboard/lists
  // COMMENTS:
  // 1.- Property 'id' should be managed on the BE.
  // 2.- Request 'objects' property include only an array of ids for the referred items, However, the response should include the entire object.
  static createList({
    id,
    name,
    icon_name,
    objects,
  }: {
    id?: string;
    name: string;
    icon_name: string;
    objects: string[];
  }) {
    // Call the AXIOS request
    $axios
      .post("/dashboard/lists", { id, name, icon_name, objects })
      .then((axiosResponse) => {
        // Return the status data contained
        const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
        const { id, name, icon_name, objects } = axiosResponse.data;
        return {
          responseCodeInfo,
          id,
          name,
          icon_name,
          objects,
        };
      });
  }

  // ---------> GET : dashboard/list - start game
  // ROUTE: /dashboards/lists/{listID}
  static getItemsForGame({
    id,
    num_questions,
  }: {
    id: string;
    num_questions: number;
  }) {
    // Call the AXIOS request
    $axios
      .get("/dashboard/lists" + id, { params: { num_questions } })
      .then((axiosResponse) => {
        // Return the status data contained
        const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
        const { id, name, icon_name, objects } = axiosResponse.data;
        return {
          responseCodeInfo,
          id,
          name,
          icon_name,
          objects,
        };
      });
  }

  // ---------> PUT : dashboard - edit list
  // ROUTE: /dashboards/lists/{listID}
  // COMMENTS:
  // 1.- Request 'objects' property include only an array of ids for the referred items, However, the response should include the entire object.
  static editList({
    id,
    name,
    icon_name,
    objects,
  }: {
    id: string;
    name: string;
    icon_name: string;
    objects: string[];
  }) {
    // Call the AXIOS request
    $axios
      .put("/dashboard/lists" + id, { id, name, icon_name, objects })
      .then((axiosResponse) => {
        // Return the status data contained
        const responseCodeInfo = RESPONSE_STATUS_CODES[axiosResponse.status];
        const { id, name, icon_name, objects } = axiosResponse.data;
        return {
          responseCodeInfo,
          id,
          name,
          icon_name,
          objects,
        };
      });
  }

  // ---------> DELETE : dashboard - delete list
  // ROUTE: /dashboards/lists/{listID}
  static deleteList({ id }: { id: string }) {
    // Call the AXIOS request
    $axios.delete("/dashboard/lists" + id).then((axiosResponse) => {
      // Return the info from the response code
      return RESPONSE_STATUS_CODES[axiosResponse.status];
    });
  }
}
