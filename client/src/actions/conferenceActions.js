import axios from "axios";

export const getConference = () => dispatch => {
  dispatch(setPageLoading());
  axios
    .get("/api/conference/")
    .then(res => {
      dispatch({
        type: "GET_CONFERENCE",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_CONFERENCE",
        payload: {}
      });
    });
};

export const getConferenceAll = () => dispatch => {
  dispatch(setPageLoading());
  axios
    .get("/api/conference/all")
    .then(res => {
      dispatch({
        type: "GET_CONFERENCE_ALL",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_CONFERENCE_ALL",
        payload: {}
      });
    });
};

export const addConferenceDetails = (
  conferenceDetails,
  history
) => dispatch => {
  axios
    .post("/api/conference/", conferenceDetails)
    .then(res => history.push("/conference"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const deleteConferenceDetail = id => dispatch => {
  axios
    .delete(`/api/conference/${id}`)
    .then(res => {
      dispatch({
        type: "GET_CONFERENCE",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const setPageLoading = () => ({
  type: "PAGE_LOADING"
});
