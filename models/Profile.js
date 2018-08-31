const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  admin: {
    type: Boolean,
    default: false
  },
  handle: {
    type: String,
    default: null
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  highest_qualification: {
    type: String,
    required: true
  },
  date_of_join_post: {
    type: Date,
    required: true
  },
  date_of_join_institute: {
    type: Date,
    required: true
  },
  pg_and_ug: [
    {
      qualification: {
        type: String,
        required: true
      },
      institution: {
        type: String,
        required: true
      },
      year: {
        type: Date,
        required: true
      },
      percentage: {
        type: String
      }
    }
  ],
  pre_graduation: [
    {
      qualification: {
        type: String,
        required: true
      },
      board: {
        type: String,
        required: true
      },
      institution: {
        type: String,
        required: true
      },
      year: {
        type: Date,
        required: true
      },
      percentage: {
        type: String
      }
    }
  ],
  work_experience: [
    {
      organisation: {
        type: String,
        required: true
      },
      designation: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      }
    }
  ],
  areas_of_interest_and_practical_experience: {
    type: [String]
  },
  project_at_pg_ug: [
    {
      title: {
        type: String,
        required: true
      },
      year: {
        type: Date,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);