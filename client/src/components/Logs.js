import React, { useState, useEffect } from "react";
import EmptyContent from "./EmptyContent";
import { API_LOGS_PATH, LOG_PATH_LINK } from "../constants";
import { fetchJson } from "../helpers/api";
import { badgeFromLevel } from "../helpers/classnames";
import { Link } from "@reach/router";
import { formatRelative } from "date-fns";

function logRow(log) {
  const { id, entry, created, level } = log;
  const parsedEntry = JSON.parse(entry);
  const humanHappened = formatRelative(new Date(created), new Date());
  const badgeStyles = badgeFromLevel(level);

  return (
    <tr key={id}>
      <td>{parsedEntry.message}</td>
      <td className="table-fit">
        <span className={badgeStyles}>debug</span>
      </td>
      <td
        className="table-fit happened tooltip-big-text"
        aria-label={created}
        data-balloon-pos="up"
      >
        {humanHappened}
      </td>
      <td className="table-fit">
        <Link to={`${LOG_PATH_LINK}${id}`} className="control-action">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16">
            <path d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          </svg>
        </Link>
      </td>
    </tr>
  );
}

export function logTable(logs) {
  const logRender = logs.map(logRow);

  return (
    <div className="table-responsive">
      <table className="table table--light mb-0 table-borderless">
        <thead>
          <tr>
            <th scope="col">Entry</th>
            <th scope="col">Level</th>
            <th scope="col">Happened</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{logRender}</tbody>
      </table>
    </div>
  );
}

function Logs() {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    fetchJson(API_LOGS_PATH, setLogs, () => setLogs(null));
  }, []);

  if (logs === null) {
    return <EmptyContent title="Logs" />;
  }

  return (
    <div className="background-secondary box-shadow">
      <h1 className="header">Logs</h1>
      {logTable(logs)}
    </div>
  );
}

export default Logs;
