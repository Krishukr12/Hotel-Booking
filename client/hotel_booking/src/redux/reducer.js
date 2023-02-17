import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        user: null,
        isLoading: true,
        error: null,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload,
        isLoading: false,
        error: null,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        user: null,
        isLoading: false,
        error: payload,
      };
    }

    default: {
      return state;
    }
  }
};
