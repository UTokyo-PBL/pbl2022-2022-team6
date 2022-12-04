/*
    Description: Handler for managing cookies (not related to interactions between FE and BE)
*/

export default class CookieController {
  /*
    Description: Sets a cookie
    Usage example> 
        @onCookieCreate = CookieController.setCookie ({cookieName: 'userId', cookieValue: 'qwe-wer-ert', expirationDays: 14})'
    Expected inputs:
        - cookieName: Title/label of the cookie,
        - cookieValue: Value of the cookie,
        - expirationDays: Days before expiration,
    Expected output (NONE)
    */

  static setCookie({
    cookieName,
    cookieValue,
    expirationDays,
  }: {
    cookieName: string;
    cookieValue: string;
    expirationDays: number;
  }) {
    const d = new Date();
    d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }

  /*
    Description: Sets a cookie
    Usage example> 
        @onCookieCreate = CookieController.getCookie ({cookieName: 'userId'})
    Expected inputs:
        - cookieName: Title/label of the cookie,
    Expected output:
        - string with the value of the cookie | '' if no cookie was found
  */

  static getCookie({ cookieName }: { cookieName: string }) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
