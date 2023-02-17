import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { Reducer } from "./reducer";
const intialState = {
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
};
export const store = createStore(
  Reducer,
  intialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
