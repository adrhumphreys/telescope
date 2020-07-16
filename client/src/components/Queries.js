import React, { useEffect, useState } from "react";
import { fetchJson } from "../helpers/api";
import { API_QUERIES_PATH, REQUEST_PATH_LINK } from "../constants";
import EmptyContent from "./EmptyContent";
import { formatRelative } from "date-fns";
import { Link } from "@reach/router";
import { ViewIcon } from "../helpers/icons";

function qRow(query, created, duration, id, requestID, pos) {
  const humanHappened = formatRelative(new Date(created), new Date());

  return (
    <tr key={`${id}-${pos}`}>
      <td className="table-path">{query}</td>
      <td>{duration}ms</td>
      <td
        className="table-fit happened tooltip-big-text"
        aria-label={created}
        data-balloon-pos="up"
      >
        {humanHappened}
      </td>
      <td className="table-fit">
        <Link
          to={`${REQUEST_PATH_LINK}${requestID}`}
          className="control-action"
        >
          <ViewIcon />
        </Link>
      </td>
    </tr>
  );
}

function queryRow(props) {
  const { queries, id, created, requestID } = props;

  return (
    <tbody key={id}>
      {queries.map(({ query, duration }, pos) =>
        qRow(query, created, duration, id, requestID, pos)
      )}
    </tbody>
  );
}

export function queryTable(queries) {
  const queryRender = queries.map(queryRow);

  return (
    <div className="table-responsive">
      <table className="table table--light mb-0 table-borderless">
        <thead>
          <tr>
            <th scope="col">Query</th>
            <th scope="col">Duration</th>
            <th scope="col">Happened</th>
            <th scope="col" />
          </tr>
        </thead>
        {queryRender}
      </table>
    </div>
  );
}

function Queries() {
  const [queries, setQueries] = useState(null);

  useEffect(() => {
    fetchJson(API_QUERIES_PATH, setQueries, () => setQueries(null));
  }, []);

  if (queries === null) {
    return <EmptyContent title="Queries" />;
  }

  return (
    <div className="background-secondary box-shadow">
      <h1 className="header">Queries</h1>
      {queryTable(queries)}
    </div>
  );
}

export default Queries;
