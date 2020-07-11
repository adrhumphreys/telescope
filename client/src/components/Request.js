import React, { useEffect, useState } from "react";
import { API_REQUEST_PATH, API_REQUEST_PARAM } from "../constants";
import { formatRelative } from "date-fns";
import { Tabs, Tab, Panel } from "./Tabs";
import JSONView from "./JSONView";
import Highlight from "./Highlight";

function renderDump(dumpObj, dumpStyle) {
  const { dump, id } = dumpObj;

  return (
    <div key={id}>
      <div
        dangerouslySetInnerHTML={{ __html: dumpStyle }}
        style={{ display: "none" }}
      />
      <div dangerouslySetInnerHTML={{ __html: dump }} />
    </div>
  );
}

function renderCode(request) {
  const {
    requestHeaders,
    responseHeaders,
    sessionBefore,
    sessionAfter,
    payload,
    response,
  } = request;

  return (
    <div className="mt-4 bg-light">
      <Tabs>
        <ul className="nav nav-pills">
          <Tab>Request headers</Tab>
          <Tab>Response headers</Tab>
          <Tab>Session before</Tab>
          <Tab>Session after</Tab>
          <Tab>Payload</Tab>
          <Tab>Response</Tab>
        </ul>
        <Panel>
          <div className="tab-content">
            <JSONView data={requestHeaders} shouldExpand={true} />
          </div>
        </Panel>
        <Panel>
          <div className="tab-content">
            <JSONView data={responseHeaders} shouldExpand={true} />
          </div>
        </Panel>
        <Panel>
          <div className="tab-content">
            <JSONView data={sessionBefore} shouldExpand={true} />
          </div>
        </Panel>
        <Panel>
          <div className="tab-content">
            <JSONView data={sessionAfter} shouldExpand={true} />
          </div>
        </Panel>
        <Panel>
          <div className="tab-content">
            <Highlight language="php">{payload}</Highlight>
          </div>
        </Panel>
        <Panel>
          <div className="tab-content">
            <Highlight language="html">{response}</Highlight>
          </div>
        </Panel>
      </Tabs>
    </div>
  );
}

function Request(props) {
  const { requestID } = props;

  const [request, setRequest] = useState(null);

  const fetchRequest = async () => {
    fetch(`${API_REQUEST_PATH.replace(API_REQUEST_PARAM, requestID)}`)
      .then((res) => res.json())
      .then((res) => setRequest(res))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (request === null) {
    return <p>Loading</p>;
  }

  const {
    happened,
    hostname,
    path,
    status,
    duration,
    ipAddress,
    memoryUsed,
    method,
    logs,
  } = request;

  console.log(logs);

  const humanHappened = formatRelative(new Date(happened), new Date());

  return (
    <div className="table-responsive">
      <h1 className="header">Request Details</h1>
      <table className="table table--request mb-0 card-bg-secondary table-borderless">
        <tbody>
          <tr>
            <td className="table-fit font-weight-bold">Time</td>
            <td className="happened">
              {humanHappened} <small>({happened})</small>
            </td>
          </tr>
          <tr>
            <td className="table-fit font-weight-bold">Hostname</td>
            <td>{hostname}</td>
          </tr>
          <tr>
            <td className="table-fit font-weight-bold">Method</td>
            <td>{method}</td>
          </tr>
          <tr>
            <td className="table-fit font-weight-bold">Path</td>
            <td>{path}</td>
          </tr>
          <tr>
            <td className="table-fit font-weight-bold">Status</td>
            <td>{status}</td>
          </tr>
          <tr>
            <td className="table-fit font-weight-bold">Duration</td>
            <td>{duration} ms</td>
          </tr>
          <tr>
            <td className="table-fit font-weight-bold">IP Address</td>
            <td>{ipAddress}</td>
          </tr>
          <tr>
            <td className="table-fit font-weight-bold">Memory usage</td>
            <td>{memoryUsed} MB</td>
          </tr>
        </tbody>
      </table>

      {renderCode(request)}
    </div>
  );
}

export default Request;
