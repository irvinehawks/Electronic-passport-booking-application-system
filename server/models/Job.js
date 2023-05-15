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
      enum: ["applying", "renewing", "booking"], // the input is of type select
      default: "booking",
    },
    applicationType: {
      type: String,
      enum: ["one-day", "three-days", "seven-days", "three-months"], // the input is of type select
      default: "one-day",
    },
    applicationLocation: {
      type: String,
      default: "type your city or location here", // not empty-string so that we can update it
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
