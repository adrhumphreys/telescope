import React from "react";
import { Link } from "@reach/router";
import { REQUESTS_PATH, DUMPS_PATH, LOGS_PATH } from "../constants";
import { RequestIcon, DumpIcon, LogIcon } from "../helpers/icons";

function Sidebar() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link
          to={REQUESTS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <RequestIcon />
          Requests
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={DUMPS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <DumpIcon />
          Dumps
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={LOGS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <LogIcon />
          Logs
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
