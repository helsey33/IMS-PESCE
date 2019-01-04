import axios from "axios";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/")
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      });
    });
};

export const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: "GET_PROFILE_ALL",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      });
    });
};

export const getProfileByHandle = handle => dispatch => {
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      });
    });
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/", profileData)
    .then(res => {
      history.push("/user");
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const setProfileLoading = () => ({
  type: "PROFILE_LOADING"
});

export const addGradDetails = (gradDetails, history) => dispatch => {
  axios
    .post("/api/profile/grad_details", gradDetails)
    .then(res => history.push("/user"))
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const deleteGradDetails = id => dispatch => {
  axios
    .delete(`api/profile/grad_details/${id}`)
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
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

export const addPreGradDetails = (gradDetails, history) => dispatch => {
  axios
    .post("/api/profile/pre_grad", gradDetails)
    .then(res => history.push("/user"))
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const deletePreGradDetails = id => dispatch => {
  axios
    .delete(`api/profile/pre_grad/${id}`)
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
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

export const addWorkExperience = (gradDetails, history) => dispatch => {
  axios
    .post("/api/profile/experience", gradDetails)
    .then(res => history.push("/user"))
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const deleteWorkExperience = id => dispatch => {
  axios
    .delete(`api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
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

export const addProject = (gradDetails, history) => dispatch => {
  axios
    .post("/api/profile/grad_project", gradDetails)
    .then(res => history.push("/user"))
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const deleteProject = id => dispatch => {
  axios
    .delete(`api/profile/grad_project/${id}`)
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
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
