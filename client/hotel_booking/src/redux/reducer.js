import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILURE,
  LOGOUT_REQUEST_SUCCESS,
  NEW_SEARCH,
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAILURE,
  REGISTER_REQUEST_SUCCESS,
  RESET_SEARCH,
} from "./actionType";

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    //  ! User Login
    case LOGIN_REQUEST: {
      return {
        ...state,
        loadings: {
          login_isLoading: true,
        },
        errors: {
          login_error_msg: null,
        },
        user: null,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loadings: {
          login_isLoading: false,
        },
        errors: {
          login_error_msg: null,
        },
        user: payload,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loadings: {
          login_isLoading: false,
        },
        errors: {
          login_error_msg: payload,
        },
        user: null,
      };
    }
    // ! Logout request
    case LOGOUT_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case LOGOUT_REQUEST_FAILURE: {
      return {
        ...state,
        error: null,
      };
    }

    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        user: null,
        error: null,
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
        loadings: {
          register_isLoading: true,
        },
        errors: {
          register_error_msg: null,
        },
      };
    }
    case REGISTER_REQUEST_FAILURE: {
      return {
        ...state,
        loadings: {
          register_isLoading: false,
        },
        errors: {
          register_error_msg: payload,
        },
      };
    }
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        loadings: {
          register_isLoading: false,
        },
        errors: {
          register_error_msg: null,
        },
      };
    }

    // ! Default state

    default: {
      return state;
    }
  }
};
