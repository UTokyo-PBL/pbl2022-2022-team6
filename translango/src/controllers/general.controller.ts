import { gServer } from "../constants/common/axios.constants"
import { AxiosResponse } from "axios";
import { Language } from "../types/common/common.types";

export default class GeneralController {
    // --------> GET: dashboard/get-languages?target_lang='en'
  // ROUTE: /dashboard/get-languages
  static getAllLanguages = async(target_language: string='en'): Promise<Record<string, string>> => {
    const axiosResponse: AxiosResponse = await gServer
      .get<Language[]>('/available-languages', {
            params: {
                target_lang: target_language
            }
      }).catch((e) => {
        const JSONError = e.toJSON();
        return JSONError;
      });
      const languages_list: Language[] = axiosResponse.data;
      const languages: Record<string, string> = {};
      languages_list.forEach(l => languages[l.code] = l.name);
      return languages;
  }
}