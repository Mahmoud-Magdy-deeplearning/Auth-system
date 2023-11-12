import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { APICore, setAuthorization } from "helpers/api/apiCore";
import { login as loginApi, signup as signupApi } from "helpers";
import { authApiResponseSuccess, authApiResponseError } from "./actions";
import { AuthActionTypes } from "./constants";

type UserData = {
  payload: {
    username: string;
    password: string;
    email: string;
  };
  type: string;
};

const api = new APICore();

function* login({
  payload: { email, password },
  type,
}: UserData): SagaIterator {
  try {
    const response = yield call(loginApi, { email, password });
    const user = response.data;
    api.setLoggedInUser(user);
    setAuthorization(user["token"]);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

function* logout(): SagaIterator {
  try {
    api.setLoggedInUser(null);
    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* signup({
  payload: { username, email, password },
}: UserData): SagaIterator {
  try {
    const response = yield call(signupApi, { username, email, password });
    const user = response.data;
    api.setLoggedInUser(user);
    setAuthorization(user["token"]);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup() {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchLogout), fork(watchSignup)]);
}

export default authSaga;
