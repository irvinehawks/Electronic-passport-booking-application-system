import { IoBarChartSharp } from "react-icons/io5";
//import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "User information and guidance",
    path: "/",
    icon: <FaWpforms />,
  },
  {
    id: 2,
    text: "Application statistics",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  //{ id: 3, text: "all applications", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 4, text: "Apply your passport", path: "apply", icon: <FaWpforms /> },
  { id: 5, text: "Book your passport", path: "book", icon: <FaWpforms /> },
  { id: 6, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 7, text: "Resources and accessories", path: "profile", icon: <ImProfile /> },
];

export default links;
