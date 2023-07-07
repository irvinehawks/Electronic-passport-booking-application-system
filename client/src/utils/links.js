import { IoBarChartSharp } from "react-icons/io5";
//import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "User application guide",
    path: "/guidance",
    icon: <FaWpforms />,
  },
  {
    id: 2,
    text: "Application statistics",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  //{ id: 3, text: "all applications", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 3, text: "Click to book or apply", path: "apply", icon: <FaWpforms /> },
  { id: 4, text: "Your profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "User application resources", path: "resources", icon: <ImProfile /> },
];

export default links;
