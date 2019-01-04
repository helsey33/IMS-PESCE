const initialState = {
  conference: null,
  conferences: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONFERENCE":
      return { ...state, conference: action.payload, loading: false };
    case "PAGE_LOADING":
      return { ...state, loading: true };
    case "GET_CONFERENCE_ALL":
      return { ...state, conferences: action.payload, loading: false };
    default:
      return state;
  }
};
