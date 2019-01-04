const initialState = {
  journal: null,
  journals: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOURNAL":
      return { ...state, journal: action.payload, loading: false };
    case "PAGE_LOADING":
      return { ...state, loading: true };
    case "GET_JOURNAL_ALL":
      return { ...state, journals: action.payload, loading: false };
    default:
      return state;
  }
};
