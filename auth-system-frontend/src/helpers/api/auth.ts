import { APICore } from "./apiCore";

const api = new APICore();

function login(params: { email: string; password: string }) {
  const baseUrl = "/auth/login/";
  return api.create(`${baseUrl}`, params);
}

function signup(params: { username: string; email: string; password: string }) {
  const baseUrl = "/auth/register/";
  return api.create(`${baseUrl}`, params);
}

export { login, signup };
