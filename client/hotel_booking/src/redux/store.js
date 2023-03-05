import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { Reducer } from "./reducer";
const intialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loadings: {
    login_isLoading: false,
    register_isLoading: false,
  },
  errors: {
    register_error_msg: null,
    login_error_msg: null,
  },
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
export const store = createStore(
  Reducer,
  intialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
