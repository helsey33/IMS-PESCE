const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.qualification = !isEmpty(data.qualification) ? data.qualification : "";
  data.institution = !isEmpty(data.institution) ? data.institution : "";
  data.year = !isEmpty(data.year) ? data.year : "";

  if (Validator.isEmpty(data.qualification)) {
    errors.qualification = "Qualification field required";
  }

  if (Validator.isEmpty(data.institution)) {
    errors.institution = "Institution required";
  }

  if (Validator.isEmpty(data.year)) {
    errors.year = "Year of passing required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
