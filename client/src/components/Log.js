import React, { useEffect, useState } from "react";
import { fetchJson } from "../helpers/api";
import { API_LOG_PATH, API_LOG_PARAM, REQUEST_PATH_LINK } from "../constants";
import EmptyContent from "./EmptyContent";
import Highlight from "./Highlight";
import { formatRelative } from "date-fns";
import { badgeFromLevel } from "../helpers/classnames";
import { Link } from "@reach/router";
import { Panel, Tab, Tabs } from "./Tabs";
import JSONView from "./JSONView";

function Log(props) {
  const { logID } = props;

  const [log, setLog] = useState(null);

  const path = API_LOG_PATH.replace(API_LOG_PARAM, logID);

  useEffect(() => {
    fetchJson(path, setLog, () => setLog(null));
  }, []);

  if (log === null) {
    return <EmptyContent title="Logs" />;
  }

  const { entry, level, created, requestID, context } = log;
  const parsedEntry = JSON.parse(entry);
  const humanHappened = formatRelative(new Date(created), new Date());
  const badgeStyles = badgeFromLevel(level);
  const { message } = parsedEntry;

  return (
    <div>
      <div className="background-secondary box-shadow">
        <h1 className="header">Message Details</h1>
        <div className="table-responsive">
          <table className="table mb-0 card-bg-secondary table-borderless">
            <tbody>
              <tr>
                <td className="table-fit font-weight-bold">Time</td>
                <td className="happened">{humanHappened}</td>
              </tr>
              <tr>
                <td className="table-fit font-weight-bold">Level</td>
                <td>
                  <span className={badgeStyles}>{level}</span>
                </td>
              </tr>
              <tr>
                <td className="table-fit font-weight-bold">Request</td>
                <td>
                  <Link
                    to={`${REQUEST_PATH_LINK}${requestID}`}
                    className="control-action"
                  >
                    View request
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="table-fit font-weight-bold">Message</td>
                <td>{message}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 bg-light">
        <Tabs>
          <ul className="nav nav-pills">
            <Tab>Log message</Tab>
            <Tab>Context</Tab>
          </ul>
          <Panel>
            <div className="tab-content">
              <JSONView data={parsedEntry} shouldExpand={true} />
            </div>
          </Panel>
          <Panel>
            <Highlight language="php" line={parsedEntry.extra.line}>
              {context}
            </Highlight>
          </Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default Log;
