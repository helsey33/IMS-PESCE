const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  jType: {
    type: String,
    required: true
  },
  paperTitle: {
    type: String,
    required: true
  },
  authors: {
    type: [String],
    required: true
  },
  jTitle: {
    type: String,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    requried: true
  },
  pageNos: {
    type: Number,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  issnNo: {
    type: Number,
    required: true
  },
  publisher: {
    type: String
  },
  onlineLink: {
    type: String
  },
  indexedBy: {
    type: String
  },
  ugcApproved: {
    type: String,
    required: true
  },
  paper: {
    type: String
  }
});

module.exports = Jounral = mongoose.model("jounral", JournalSchema);
