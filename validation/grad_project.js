const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.year = !isEmpty(data.year) ? data.year : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title required";
  }

  if (Validator.isEmpty(data.year)) {
    errors.year = "Year required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
