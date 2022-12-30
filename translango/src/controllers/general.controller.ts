import { gServer } from "../constants/common/axios.constants"
import { AxiosResponse } from "axios";
import { Language, TranslationResponseType } from "../types/common/common.types";

export default class GeneralController {
  // --------> GET: /available-languages?target_lang='en'
  // ROUTE: /available-languages
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


  /**
   * Get translation for a text
   */
  static getTranslation = async(text: string, target_lang: string, source_lang: string | null = null) => {
    const axiosResponse: AxiosResponse<TranslationResponseType> = await gServer.post<TranslationResponseType>('/testing/text-translate', {
      text, target_lang, source_lang
    });

    const translation = axiosResponse.data;
    return translation;
  }
}