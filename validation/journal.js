const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  const errors = {};

  data.paperTitle = !isEmpty(data.paperTitle) ? data.paperTitle : "";
  data.authors = !isEmpty(data.authors) ? data.authors : "";
  data.jTitle = !isEmpty(data.jTitle) ? data.jTitle : "";
  data.volume = !isEmpty(data.volume) ? data.volume : "";
  data.issue = !isEmpty(data.issue) ? data.issue : "";
  data.pageNos = !isEmpty(data.pageNos) ? data.pageNos : "";
  data.publishDate = !isEmpty(data.publishDate) ? data.publishDate : "";
  data.issnNo = !isEmpty(data.issnNo) ? data.issnNo : "";

  if (Validator.isEmpty(data.paperTitle)) {
    errors.paperTitle = "Paper Title required";
  }

  if (Validator.isEmpty(data.authors)) {
    errors.authors = "Atleast one author required";
  }

  if (Validator.isEmpty(data.jTitle)) {
    errors.jTitle = "Journal Title required";
  }

  if (Validator.isEmpty(data.volume)) {
    errors.volume = "Volume required";
  }

  if (Validator.isEmpty(data.issue)) {
    errors.issue = "Issue required";
  }

  if (Validator.isEmpty(data.pageNos)) {
    errors.pageNos = "Page numbers required";
  }

  if (Validator.isEmpty(data.publishDate)) {
    errors.publishDate = "Publish Date required";
  }

  if (Validator.isEmpty(data.issnNo)) {
    errors.issnNo = "ISSN number required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
