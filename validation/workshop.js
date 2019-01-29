const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.organized_by = !isEmpty(data.organized_by) ? data.organized_by : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Workshop title required";
  }

  if (Validator.isEmpty(data.organized_by)) {
    errors.organized_by = "Organized by required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
