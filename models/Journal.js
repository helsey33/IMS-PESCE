const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  journalData: [
    {
      jType: {
        type: String,
        required: true
      },
      paperTitle: {
        type: String,
        required: true
      },
      authors: {
        type: String,
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
        type: String,
        required: true
      },
      publishDate: {
        type: String,
        required: true
      },
      issnNo: {
        type: String,
        required: true
      },
      publisher: {
        type: String
      },
      onlineLink: {
        type: String
      },
      indexedBy: {
        webOfScience: {
          type: Boolean
        },
        scopus: {
          type: Boolean
        },
        indianCitationIndex: {
          type: Boolean
        }
      },
      ugcApproved: {
        type: String,
        required: true
      },
      paper: {
        type: String
      }
    }
  ]
});

module.exports = Journal = mongoose.model("jounral", JournalSchema);
