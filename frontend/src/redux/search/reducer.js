import { SEARCH_CHANGE } from "./action";

const authInitialState = {
  search: null,
};

const initialState = {
  ...authInitialState,
  action: "",
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CHANGE:
      return {
        ...state,
        action: action.type,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default search;
