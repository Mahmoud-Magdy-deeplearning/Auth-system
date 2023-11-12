import { APICore } from "./apiCore";

const api = new APICore();

function getUsers(params: {}) {
  const baseUrl = "/auth/users/";
  return api.get(`${baseUrl}`, params);
}

export { getUsers };
