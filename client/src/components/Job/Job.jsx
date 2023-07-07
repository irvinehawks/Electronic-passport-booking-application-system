import moment from "moment"; // moment js for time-format
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "./Job.styles";
import JobInfo from "../JobInfo/JobInfo";
import { useAppContext } from "../../context/appContext";

const Job = ({
  _id,
  name,
  id_no,
  applicationLocation,
  applicationType,

  applicationDate,
  uploadBirth,
  uploadPhotos,

  createdAt,
  status,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{id_no.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{id_no}</p>
        </div>
      </header>

      <div className="content">
        {/* content center */}
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={applicationLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={applicationType} />

          <JobInfo icon={<FaBriefcase />} text={applicationDate} />
          <JobInfo icon={<FaBriefcase />} text={uploadBirth} />
          <JobInfo icon={<FaBriefcase />} text={uploadPhotos} />

          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer>
          <div className="actions">
            <Link
              to="/apply"
              onClick={() => setEditJob(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
