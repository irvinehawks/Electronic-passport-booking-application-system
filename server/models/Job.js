import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    id_no: {
      type: String,
      required: [true, "Please provide youor national registration number."],
      maxlength: 50,
    },
    name: {
      type: String,
      required: [true, "Please provide your full name"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["scheduled", "declined", "pending"], // the input is of type select
      default: "pending",
    },
    applicationType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"], // the input is of type select
      default: "full-time",
    },
    applicationLocation: {
      type: String,
      default: "my city", // not empty-string so that we can update it
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // so that we we can filter by creator to show the jobs to the user related to them
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
