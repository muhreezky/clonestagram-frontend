import Cookies from "js-cookie";

/**
 * 
 * @returns {{loggedIn: boolean, access_token: string | null}}
 */
export default function useLoginData () {
  const data = Cookies.get("access_token");

  return {
    loggedIn: data ? true : false,
    access_token: data || null
  }
}