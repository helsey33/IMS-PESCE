import axios from "axios";

export const getWorkshop = () => dispatch => {
  dispatch(setPageLoading());

  axios
    .get("/api/workshop/")
    .then(res => {
      dispatch({
        type: "GET_WORKSHOP",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_WORKSHOP",
        payload: {}
      });
    });
};

export const getWorkshopAll = () => dispatch => {
  dispatch(setPageLoading());
  axios
    .get("/api/workshop/all")
    .then(res => {
      dispatch({
        type: "GET_WORKSHOP_ALL",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_WORKSHOP_ALL",
        payload: {}
      });
    });
};

export const addWorkshopDetails = (workshopDetails, history) => dispatch => {
  axios
    .post("/api/workshop/", workshopDetails)
    .then(res => history.push("/workshop"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const deleteWorkshopDetail = id => dispatch => {
  axios
    .delete(`/api/workshop/${id}`)
    .then(res => {
      dispatch({
        type: "GET_WORKSHOP",
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
