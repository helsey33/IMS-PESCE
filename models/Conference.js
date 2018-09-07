const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConferenceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  cType: {
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
  conferenceTitle: {
    type: String,
    required: true
  },
  organizedBy: {
    type: String,
    required: true
  },
  conferenceDate: {
    type: Date
  },
  isbnNo: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  certificate: {
    type: String
  },
  paper: {
    type: String
  }
});

module.exports = Conference = mongoose.model("conference", ConferenceSchema);
