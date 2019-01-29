const initialState = {
  workshop: null,
  workshops: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_WORKSHOP":
      return { ...state, workshop: action.payload, loading: false };
    case "PAGE_LOADING":
      return { ...state, loading: true };
    case "GET_WORKSHOP_ALL":
      return { ...state, workshops: action.payload, loading: false };
    default:
      return state;
  }
};
