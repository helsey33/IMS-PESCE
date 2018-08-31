const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.organisation = !isEmpty(data.organisation) ? data.organisation : "";
  data.designation = !isEmpty(data.designation) ? data.designation : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.organisation)) {
    errors.organisation = "Organisation field required";
  }

  if (Validator.isEmpty(data.designation)) {
    errors.designation = "Designation required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Starting date of work required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
