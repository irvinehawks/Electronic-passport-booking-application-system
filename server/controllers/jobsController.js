import Application from "../models/application.js";
import mongoose from "mongoose";
import moment from "moment";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

// -----All the functions must be ASYNC as we're connecting to a DB----- //

const createJob = async (req, res) => {
  const { name, id_no } = req.body;

  // only check if these 2 inputs exist as the other inputs are (select) so by default they will exist
  if (!name || !id_no) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const application = await Application.create(req.body);
  res.status(StatusCodes.CREATED).json({ application });
};

const getAllJobs = async (req, res) => {
  const { status, applicationType, sort, search } = req.query;

  // object that contains the queries that will be provided to mongoDB
  const queryObject = {
    createdBy: req.user.userId,
  };

  // add queries based on condition
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (applicationType && applicationType !== "all") {
    queryObject.applicationType = applicationType;
  }
  if (search) {
    queryObject.name = { $regex: search, $options: "i" }; // to search using regular-expressions NOT exact text
  }

  // NO AWAIT
  let result = Application.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt"); // Descending
  }
  if (sort === "oldest") {
    result = result.sort("createdAt"); // Ascending
  }
  if (sort === "a-z") {
    result = result.sort("position"); // Ascending
  }
  if (sort === "z-a") {
    result = result.sort("-position"); // Descending
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; // skipping 10 items each time to display the other 10 in the next page

  result = result.skip(skip).limit(limit);
  const jobs = await result;
  const totalJobs = await Application.countDocuments(queryObject); // instead of using the length as length indicates 10 items here and not all jobs
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const { id_no, name } = req.body;

  // Extra step for validation
  if (!id_no || !name) {
    throw new BadRequestError("Please Provide All Values");
  }

  const application = await Application.findOne({ _id: jobId });

  if (!application) {
    throw new NotFoundError(`No application with id ${jobId}`);
  }

  // check permissions -> to prevent different user from modifying other users' jobs if they have their job-ID
  checkPermissions(req.user, application.createdBy);

  const updatedJob = await Application.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true, // validate that the data exists
  });

  res.status(StatusCodes.OK).json({ updatedJob }); // for postman
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const application = await Application.findOne({ _id: jobId });

  if (!application) {
    throw new NotFoundError(`No application with id ${jobId}`);
  }

  // check permissions -> to prevent different user from deleting other users' jobs if they have their job-ID
  checkPermissions(req.user, application.createdBy);

  await application.remove();
  res.status(StatusCodes.OK).json({ msg: "success! application Removed" }); // for postman
};

// Aggregation pipeline
const showStats = async (req, res) => {
  let stats = await Application.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } }, // all jobs for one user
    { $group: { _id: "$status", count: { $sum: 1 } } }, // group by job-count for each (job-status) field
  ]);

  // manipulating the stats structure to be more usable
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count; // Ex: (pending: 34)
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 4,
    scheduled: stats.scheduled || 3,
    declined: stats.declined || 1,
  };

  // data for chart
  let monthlyApplications = await Application.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, // sort from latest to oldest
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1) // as mongoDB uses months(1-12) not (0-11)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
