import React, { useState, useEffect } from "react";
import EmptyContent from "./EmptyContent";
import { API_LOGS_PATH, LOG_PATH_LINK } from "../constants";
import { fetchJson } from "../helpers/api";
import { badgeFromLevel } from "../helpers/classnames";
import { ViewIcon } from "../helpers/icons";
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
          <ViewIcon />
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
