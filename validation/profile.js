const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.date_of_birth = !isEmpty(data.date_of_birth) ? data.date_of_birth : "";
  data.designation = !isEmpty(data.designation) ? data.designation : "";
  data.highest_qualification = !isEmpty(data.highest_qualification)
    ? data.highest_qualification
    : "";
  data.date_of_join_post = !isEmpty(data.date_of_join_post)
    ? data.date_of_join_post
    : "";
  data.date_of_join_institute = !isEmpty(data.date_of_join_institute)
    ? data.date_of_join_institute
    : "";

  if (Validator.isEmpty(data.date_of_birth)) {
    errors.date_of_birth = "Date of birth required";
  }

  if (Validator.isEmpty(data.designation)) {
    errors.designation = "Designation required";
  }

  if (Validator.isEmpty(data.highest_qualification)) {
    errors.highest_qualification = "Highest qualification required";
  }

  if (Validator.isEmpty(data.date_of_join_post)) {
    errors.date_of_join_post = "Date of joining the post required";
  }

  if (Validator.isEmpty(data.date_of_join_institute)) {
    errors.date_of_join_institute = "Date of joining the institute required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
