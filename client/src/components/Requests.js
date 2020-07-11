import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { REQUEST_PATH_LINK, API_REQUESTS_PATH } from "../constants";
import { formatRelative } from "date-fns";
import { ViewIcon } from "../helpers/icons";

function requestRow(request) {
  const { method, path, status, duration, happened, id } = request;
  const humanHappened = formatRelative(new Date(happened), new Date());
  return (
    <tr key={id}>
      <td className="table-fit pr-0">
        <span className="badge bg-secondary text-dark font-weight-bold">
          {method}
        </span>
      </td>
      <td className="">{path}</td>
      <td className="table-fit">
        <span className="badge bg-secondary text-dark">{status}</span>
      </td>
      <td className="table-fit">{duration}</td>
      <td
        className="table-fit happened tooltip-big-text"
        aria-label={happened}
        data-balloon-pos="up"
      >
        {humanHappened}
      </td>
      <td className="table-fit">
        <Link to={`${REQUEST_PATH_LINK}${id}`} className="control-action">
          <ViewIcon />
        </Link>
      </td>
    </tr>
  );
}

function Requests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    fetch(API_REQUESTS_PATH)
      .then((res) => res.json())
      .then((res) => setRequests(res))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requestRows = requests.map(requestRow);

  return (
    <div className="background-secondary box-shadow">
      <h1 className="header">Requests</h1>
      <div className="table-responsive">
        <table className="table table--light mb-0 table-borderless">
          <thead>
            <tr>
              <th scope="col">Verb</th>
              <th scope="col">Path</th>
              <th scope="col">Status</th>
              <th scope="col">Duration</th>
              <th scope="col">Happened</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{requestRows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Requests;
