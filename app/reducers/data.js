import * as types from "../actions/types";
const initialState = {
  data: [],
  position: 0,
  type: "",
  isfilter: false,
  filter: []
};

export function data(state = initialState, action) {
  switch (action.type) {
    case types.GET_REQUEST:
      return { ...state };

    case types.GET_SUCESS:
      return {
        ...state,
        type: "",
        isfilter: false,
        filter: [],
        data: Object.assign([], state.data, action.data)
      };

    case types.GET_INITIAL:
      return {
        ...state,
        type: "",
        isfilter: false,
        filter: [],
        data: Object.assign(
          [],
          state.data,
          state.data.length > 0 ? state.data : action.data
        )
      };

    case types.UPDATE_REQUEST:
      return {
        ...state,
        type: "view",
        isfilter: false,
        filter: [],
        position: action.position
      };

    case types.UPDATE_SUCESS:
      return {
        ...state,
        type: "",
        isfilter: false,
        filter: [],
        position: action.position
      };

    case types.CREATE_REQUEST:
      return {
        ...state,
        type: "new",
        isfilter: false,
        filter: []
      };

    case types.FILTER_REQUEST:
      return {
        ...state,
        type: "",
        isfilter: true,
        filter: action.filter
      };
  }

  return state;
}
