import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  NEW_SEARCH,
  RESET_SEARCH,
} from "./actionType";

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
    case NEW_SEARCH: {
      return {
        ...state,
        searchedInitialState: payload,
      };
    }

    case RESET_SEARCH: {
      return {
        ...state,
        searchedInitialState: {
          city: undefined,
          dates: [],
          options: {
            adult: undefined,
            children: undefined,
            room: undefined,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
