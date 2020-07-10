import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { REQUEST_PATH_LINK, API_REQUESTS_PATH } from "../constants";
import { formatRelative } from "date-fns";

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16">
            <path d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          </svg>
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
    <div className="table-responsive">
      <h1 className="table-header">Requests</h1>
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
  );
}

export default Requests;
