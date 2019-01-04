import axios from "axios";

export const getJournal = () => dispatch => {
  dispatch(setPageLoading());
  axios
    .get("/api/journal/")
    .then(res => {
      dispatch({
        type: "GET_JOURNAL",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_JOURNAL",
        payload: {}
      });
    });
};

export const getJournalAll = () => dispatch => {
  dispatch(setPageLoading());
  axios
    .get("/api/journal/all")
    .then(res => {
      dispatch({
        type: "GET_JOURNAL_ALL",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_JOURNAL_ALL",
        payload: {}
      });
    });
};

export const addJournalDetails = (journalDetails, history) => dispatch => {
  axios
    .post("/api/journal/", journalDetails)
    .then(res => history.push("/journal"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const deleteJournalDetail = id => dispatch => {
  axios
    .delete(`/api/journal/${id}`)
    .then(res => {
      dispatch({
        type: "GET_JOURNAL",
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
