import * as types from "../actions/types";
const initialState = {
  login: {},
  fetching: false,
  fetched: false,
  error: null
};

export function login(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, fetching: true };
      break;

    case types.LOGIN_SUCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        login: Object.assign({}, state.login, action.playload)
      };
      break;

    case types.LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.playload
      };
      break;
  }

  return state;
}
