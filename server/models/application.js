import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    id_no: {
      type: String,
      required: [true, "Please provide youor national registration number."],
      maxlength: 50,
    },
    name: {
      type: String,
      required: [true, "Please provide your name and surname"],
      maxlength: 100,
    },
    ApplicantionPreferences: {
      type: String,
      enum: ["booking", "applying", "renewing"], // the input is of type select
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

    //More form values or input for passport application
    applicationDate: {
      type: String,
    },

    uploadBirth: {
      type: String,
    },

    uploadPhotos: {
      type: String,
    },
    //End of additional form input

    createdBy: {
      type: mongoose.Types.ObjectId, // so that we we can filter by applicant
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", ApplicationSchema);
