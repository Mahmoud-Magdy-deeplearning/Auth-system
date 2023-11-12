import jwtDecode from "jwt-decode";
import axios from "axios";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const setAuthorization = (token: string | null) => {
  if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  else delete axios.defaults.headers.common["Authorization"];
};

const getUserFromSession = () => {
  const user = sessionStorage.getItem("user_session");
  return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
};
class APICore {
  get = (url: string, params: any) => {
    return axios.get(`${url}`, params);
  };

  create = (url: string, data: any) => {
    return axios.post(url, data);
  };

  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();

    if (!user || (user && !user.token)) {
      return false;
    }
    const decoded: any = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  setLoggedInUser = (session: any) => {
    if (session)
      sessionStorage.setItem("user_session", JSON.stringify(session));
    else {
      sessionStorage.removeItem("user_session");
    }
  };
  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromSession();
  };

  setUserInSession = (modifiedUser: any) => {
    let userInfo = sessionStorage.getItem("user_session");
    if (userInfo) {
      const { token, user } = JSON.parse(userInfo);
      this.setLoggedInUser({ token, ...user, ...modifiedUser });
    }
  };
}

/*
Check if token available in session
*/
let user = getUserFromSession();
if (user) {
  const { token } = user;
  if (token) {
    setAuthorization(token);
  }
}

export { APICore, setAuthorization };
