const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return { ...state, profile: action.payload };
    case "GET_PROFILE_ALL":
      return { ...state, profiles: action.payload };
    default:
      return state;
  }
};
