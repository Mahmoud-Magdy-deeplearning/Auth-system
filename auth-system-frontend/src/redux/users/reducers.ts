import { UserActionTypes } from "./constants";

const INIT_STATE = {
  users: [],
  loading: false,
};

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

  payload: { actionType?: string; data?: User[] | {}; error?: string };
};

type State = {
  users?: User[] | [];
  loading?: boolean;
};

const Users = (state: State = INIT_STATE, action: UserActionType) => {
  switch (action.type) {
    case UserActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case UserActionTypes.GET_USERS: {
          return {
            ...state,
            users: action.payload.data,
            loading: false,
          };
        }

        default:
          return { ...state };
      }

    case UserActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case UserActionTypes.GET_USERS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        default:
          return { ...state };
      }

    case UserActionTypes.GET_USERS:
      return { ...state, loading: true, users: [] };

    case UserActionTypes.RESET:
      return {
        ...state,
        loading: false,
        error: false,
        users: [],
      };
    default:
      return { ...state };
  }
};

export default Users;
