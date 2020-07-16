import React from "react";
import { Link } from "@reach/router";
import {
  BASE_PATH,
  REQUESTS_PATH,
  DUMPS_PATH,
  LOGS_PATH,
  QUERIES_PATH,
} from "../constants";
import { RequestIcon, DumpIcon, LogIcon, QueryIcon } from "../helpers/icons";
import classNames from "classnames";

const NavLink = (props) => {
  const { className } = props;
  return (
    <Link
      {...props}
      getProps={(p) => {
        const {
          isCurrent,
          isPartiallyCurrent,
          href,
          location: { pathname },
        } = p;
        let mainRoute =
          href && href.includes(REQUESTS_PATH) && pathname === BASE_PATH;
        return {
          className: classNames(
            {
              active: isCurrent || isPartiallyCurrent || mainRoute,
            },
            className
          ),
        };
      }}
    />
  );
};

function Sidebar() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <NavLink
          to={REQUESTS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <RequestIcon />
          Requests
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to={DUMPS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <DumpIcon />
          Dumps
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to={LOGS_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <LogIcon />
          Logs
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to={QUERIES_PATH}
          className="nav-link d-flex align-items-center pt-0"
        >
          <QueryIcon />
          Queries
        </NavLink>
      </li>
    </ul>
  );
}

export default Sidebar;
