export const SEARCH_CHANGE = "SEARCH_CHANGE";

export const searchChange = (payload) => {
  return {
    type: SEARCH_CHANGE,
    payload,
  };
};
