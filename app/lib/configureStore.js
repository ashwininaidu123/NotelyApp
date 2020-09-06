import { compose, createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

export default function configureStore() {
  const store = createStore(reducer, compose(applyMiddleware(thunk, logger)));
  return store;
}
