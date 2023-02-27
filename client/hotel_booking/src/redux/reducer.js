import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  NEW_SEARCH,
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAILURE,
  REGISTER_REQUEST_SUCCESS,
  RESET_LOADING_STATUS,
  RESET_SEARCH,
} from "./actionType";

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    //  ! User Login
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
    //  ! Search Request
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
    //  ! User Registration

    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case REGISTER_REQUEST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    // ! Reset Loading Status

    case RESET_LOADING_STATUS: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    // ! Default state

    default: {
      return state;
    }
  }
};
