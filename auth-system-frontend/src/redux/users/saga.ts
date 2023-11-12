import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { getUsers as getUsersApi } from "helpers";
import { usersApiResponseSuccess, usersApiResponseError } from "./actions";
import { UserActionTypes } from "./constants";

type UserData = {
  payload: {};
  type: string;
};

// eslint-disable-next-line
function* getUsers({ payload: {}, type }: UserData): SagaIterator {
  try {
    const response = yield call(getUsersApi, {});
    const users = response.data;
    yield put(usersApiResponseSuccess(UserActionTypes.GET_USERS, users));
  } catch (error: any) {
    yield put(usersApiResponseError(UserActionTypes.GET_USERS, error));
  }
}

export function* watchGetUsers() {
  yield takeEvery(UserActionTypes.GET_USERS, getUsers);
}

function* usersSaga() {
  yield all([fork(watchGetUsers)]);
}

export default usersSaga;
