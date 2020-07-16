import React, { useEffect, useState } from "react";
import { fetchJson } from "../helpers/api";
import { API_DUMPS_PATH, REQUEST_PATH_LINK } from "../constants";
import EmptyContent from "./EmptyContent";
import { formatRelative } from "date-fns";
import getDumpStyle from "../helpers/getDumpStyle";
import { Link } from "@reach/router";

function dumpRender(props, includeLinkToRequest) {
  const { id, created, dump, requestID } = props;
  const humanHappened = formatRelative(new Date(created), new Date());
  return (
    <div key={id}>
      <p className="background-secondary mb-0 mt-0 p-4">
        <span
          className="happened tooltip-big-text"
          aria-label={created}
          data-balloon-pos="up"
        >
          Happened: {humanHappened}
        </span>
        <br />
        {includeLinkToRequest && (
          <Link to={`${REQUEST_PATH_LINK}${requestID}`}>View Request</Link>
        )}
      </p>

      <div className="mb-0" dangerouslySetInnerHTML={{ __html: dump }} />
    </div>
  );
}

export function dumpContent(dumps, includeLinkToRequest = true) {
  return (
    <div>
      {dumps.map((dump) => dumpRender(dump, includeLinkToRequest))}
      {getDumpStyle()}
    </div>
  );
}

function Dumps() {
  const [dumps, setDumps] = useState(null);

  useEffect(() => {
    fetchJson(API_DUMPS_PATH, setDumps, () => setDumps(null));
  }, []);

  if (dumps === null) {
    return <EmptyContent title="Dumps" />;
  }

  return (
    <div className="background-secondary box-shadow">
      <h1 className="header">Logs</h1>
      {dumpContent(dumps)}
    </div>
  );
}

export default Dumps;
