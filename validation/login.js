const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password  required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
