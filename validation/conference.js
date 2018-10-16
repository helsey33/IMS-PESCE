const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.paperTitle = !isEmpty(data.paperTitle) ? data.paperTitle : "";
  data.authors = !isEmpty(data.authors) ? data.authors : "";
  data.conferenceTitle = !isEmpty(data.conferenceTitle)
    ? data.conferenceTitle
    : "";
  data.organizedBy = !isEmpty(data.organizedBy) ? data.organizedBy : "";
  data.isbnNo = !isEmpty(data.isbnNo) ? data.isbnNo : "";
  data.publisher = !isEmpty(data.publisher) ? data.publisher : "";

  if (Validator.isEmpty(data.paperTitle)) {
    errors.paperTitle = "Paper Title required";
  }

  if (Validator.isEmpty(data.authors)) {
    errors.authors = "Atleast one author required";
  }

  if (Validator.isEmpty(data.conferenceTitle)) {
    errors.conferenceTitle = "Conference Title required";
  }

  if (Validator.isEmpty(data.organizedBy)) {
    errors.organizedBy = "Field required";
  }

  if (Validator.isEmpty(data.isbnNo)) {
    errors.isbnNo = "ISBN No required";
  }
  if (!Validator.matches(data.conferenceDate, /^\d{2}\/\d{4}$/g)) {
    errors.conferenceDate = "Format of the date is mm/yyyy";
  }

  if (Validator.isEmpty(data.publisher)) {
    errors.publisher = "Publisher required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
