const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkshopSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  workshopData: [
    {
      wType: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      start_date: {
        type: Date,
        required: true
      },
      end_date: {
        type: Date,
        required: true
      },
      organized_by: {
        type: String,
        required: true
      },
      target_audience: {
        type: String
      },
      certificate: {
        type: String
      },
      report: {
        type: String
      },
      academicYear: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Workshop = mongoose.model("workshop", WorkshopSchema);
