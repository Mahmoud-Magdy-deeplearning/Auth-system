import { UserActionTypes } from "./constants";
type User = {
  _id: string;
  email: string;
  username: string;
};
export type UserActionType = {
  type:
    | UserActionTypes.API_RESPONSE_SUCCESS
    | UserActionTypes.API_RESPONSE_ERROR
    | UserActionTypes.GET_USERS
    | UserActionTypes.RESET;

  payload: {} | string | User[];
};

// common success
export const usersApiResponseSuccess = (
  actionType: string,
  data: User[] | {}
): UserActionType => ({
  type: UserActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const usersApiResponseError = (
  actionType: string,
  error: string
): UserActionType => ({
  type: UserActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getUsers = (): UserActionType => {
  return {
    type: UserActionTypes.GET_USERS,
    payload: {},
  };
};

export const resetUsers = (): UserActionType => ({
  type: UserActionTypes.RESET,
  payload: {},
});
