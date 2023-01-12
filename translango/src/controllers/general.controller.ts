import { gServer } from "../constants/common/axios.constants";
import { AxiosResponse } from "axios";
import {
  Language,
  ObjectDetectionFromImageResponseType,
  TranslationResponseType,
} from "../types/common/common.types";
import { UserFromBackend, UserSignUp } from "../types/common/axios.types";

export default class GeneralController {
  // --------> GET: /available-languages?target_lang='en'
  // ROUTE: /available-languages
  static getAllLanguages = async (
    target_language: string = "en"
  ): Promise<Record<string, string>> => {
    const axiosResponse: AxiosResponse = await gServer
      .get<Language[]>("/available-languages", {
        params: {
          target_lang: target_language,
        },
      })
      .catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
    const languages_list: Language[] = axiosResponse.data;
    const languages: Record<string, string> = {};
    languages_list.forEach((l) => (languages[l.code] = l.name));
    return languages;
  };

  /**
   * Get translation for a text
   */
  static getTranslation = async (
    text: string,
    target_lang: string,
    source_lang: string | null = null
  ): Promise<TranslationResponseType> => {
    const axiosResponse: AxiosResponse<TranslationResponseType> =
      await gServer.post<TranslationResponseType>("/testing/text-translate", {
        text,
        target_lang,
        source_lang,
      });

    const translation = axiosResponse.data;
    return translation;
  };

  /**
   * Get detections in an image
   */
  static getDetectionsInImage = async (
    imgObj: File,
    target_languages: string[],
    source_language: string
  ): Promise<ObjectDetectionFromImageResponseType> => {
    const formdata = new FormData();
    formdata.set("file", imgObj, imgObj.name);
    //@ts-ignore
    formdata.set("target_languages", target_languages);
    formdata.set("source_language", source_language);
    const axiosResponse =
      await gServer.post<ObjectDetectionFromImageResponseType>(
        "/testing/image-object-detection",
        formdata,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      );
    return axiosResponse.data;
  };

  /**
   * User Sign up
   */
  static signup = async (user: UserSignUp): Promise<UserFromBackend> => {
    const axiosResponse = await gServer.post<UserFromBackend>("/signup", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return axiosResponse.data;
  };

  /**
   * Get User data
   */
  static getUserProfile = async (): Promise<UserFromBackend> => {
    const auth_token = localStorage.getItem("auth-token");
    if (!auth_token) throw new Error("Token not found");
    try {
      const axiosResponse = await gServer.get<UserFromBackend>("/users/me", {
        headers: {
          Authorization: auth_token,
        },
      });
      return axiosResponse.data;
    } catch (e) {
      // @ts-ignore
      throw e.response;
    }
  };

  /**
   * Sign in using username and password
   */
  static signin = async (
    username: string,
    password: string
  ): Promise<UserFromBackend> => {
    const axiosResponse = await gServer.post<UserFromBackend>(
      "/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return axiosResponse.data;
  };
}
