import { $axios } from "../../constants/common/axios.constants";

// --------->>> MAIN CLASS
export default class DashboardController {
  // ---------> GET: dashboard/main - top
  // ROUTE: /dashboard/top
  // COMMENTS:
  // 1.- What does this do?
  static async getDashboardTop() {
    // Call the AXIOS request
    const axiosResponse = await $axios.get("/dashboard/top").catch((e) => {
      const JSONError = e.toJSON();
      return JSONError;
    });
    return axiosResponse;
  }

  // ---------> POST : edit dashboard/top
  // ROUTE: /dashboard/top
  static async updateUserPreferredLanguages({
    languages,
  }: {
    languages: string[];
  }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .post(" /dashboard/top", {
        languages,
      })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> GET : dashboard/histories - list histories
  // ROUTE: /dashboard/histories
  static async getItems() {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .get("/dashboard/histories")
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> POST : dashboard/camera - add history (detect object or text)
  // ROUTE: /dashboard/histories
  // COMMENTS : Some parameters (original & target) are misleading.
  static async translateImageFromUrl({
    type,
    image_url,
    id,
    original,
    target,
  }: {
    type: "object" | "text";
    image_url?: string;
    id?: string;
    original: { language: string; id: string; text?: string };
    target: { language: string; id: string; text?: string }[];
  }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .post("/dashboard/histories?type=" + type, {
        image_url,
        id,
        original,
        target,
      })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> GET : dashboard/history - one history for object
  // ROUTE: /dashboard/histories/{objectID}
  static async getOneItem({ id }: { id: string }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .get("/dashboard/histories/" + id)
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> DELETE : dashboard/history - one history for object
  // ROUTE: /dashboard/histories/{objectID}
  static async deleteOneItem({ id }: { id: string }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .delete("/dashboard/histories/" + id)
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // TODO : Este idiota dej'o las cosas como quizo y ahora tengo quer trabajar m'as
  // ---------> POST :
  // - dashboard/history - edit liked
  // - dashboard/history - edit caption
  // - dashboard/history - edit num failures
  // - dashboard/history - edit original language
  // ROUTE: /dashboard/histories/{objectID}/edit
  // COMMENTS:
  // 1.- Only one change per call?

  // ROUTE: /dashboard/histories/{objectID}
  static async editItem({
    id,
    caption,
    num_failures,
    original,
    liked,
  }: {
    id: string;
    original?: { language: string; id: string; text?: string };
    caption?: string;
    liked?: boolean;
    num_failures?: number;
  }) {
    // Set the editTarget property according to the received items
    const editTarget =
      caption !== undefined
        ? "caption"
        : num_failures !== undefined
        ? "num_failures"
        : original !== undefined
        ? "original"
        : liked !== undefined
        ? "liked"
        : "";

    // Call the AXIOS request
    const axiosResponse = await $axios
      .post("/dashboard/histories/" + id + "/" + editTarget, {
        caption,
        num_failures,
        original,
        liked,
      })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> GET : dashboard/list - lists
  // ROUTE: /dashboard/lists
  static async getLists() {
    // Call the AXIOS request
    const axiosResponse = await $axios.get("/dashboard/lists").catch((e) => {
      const JSONError = e.toJSON();
      return JSONError;
    });
    return axiosResponse;
  }

  // ---------> POST : dashboard/list - add custom list
  // ROUTE: /dashboard/lists
  // COMMENTS:
  // 1.- icon_name is set to icon-name, which cannot be sent as Json from axios
  static async createList({
    id,
    name,
    icon_name,
    objects,
  }: {
    id?: string;
    name: string;
    icon_name: string;
    objects: { id: string }[];
  }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .post("/dashboard/lists", { id, name, icon_name, objects })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> GET : dashboard/list - start game
  // ROUTE: /dashboards/lists/{listID}
  static async getList({
    id,
    num_questions,
  }: {
    id: string;
    num_questions: number;
  }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .get("/dashboard/lists" + id, { params: { num_questions } })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> PUT : dashboard - edit list
  // ROUTE: /dashboards/lists/{listID}
  // COMMENTS:
  // 1.- Request 'objects' property include only an array of ids for the referred items, However, the response should include the entire object.
  static async editList({
    id,
    name,
    icon_name,
    objects,
  }: {
    id: string;
    name: string;
    icon_name: string;
    objects: { id: string }[];
  }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .put("/dashboard/lists/" + id, { id, name, icon_name, objects })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }

  // ---------> DELETE : dashboard - delete list
  // ROUTE: /dashboards/lists/{listID}
  static async deleteList({ id }: { id: string }) {
    // Call the AXIOS request
    const axiosResponse = await $axios
      .delete("/dashboard/lists/" + id)
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    return axiosResponse;
  }
}
