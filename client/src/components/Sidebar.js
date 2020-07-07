import React from "react";
import { Link } from "@reach/router";
import { REQUESTS_PATH, DUMPS_PATH } from "../constants";

function Sidebar() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link
          to={REQUESTS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M0 3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm2 2v12h16V5H2zm8 3l4 5H6l4-5z"></path>
          </svg>
          Requests
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={DUMPS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M.7 9.3l4.8-4.8 1.4 1.42L2.84 10l4.07 4.07-1.41 1.42L0 10l.7-.7zm18.6 1.4l.7-.7-5.49-5.49-1.4 1.42L17.16 10l-4.07 4.07 1.41 1.42 4.78-4.78z"></path>
          </svg>
          Dumps
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
