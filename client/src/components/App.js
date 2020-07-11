import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Requests from "./Requests";
import Request from "./Request";
import Dumps from "./Dumps";
import Logs from "./Logs";
import Log from "./Log";
import { Router } from "@reach/router";
import {
  REQUESTS_PATH,
  DUMPS_PATH,
  REQUEST_PATH,
  LOGS_PATH,
  LOG_PATH,
} from "../constants";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container mt-4 pb-4">
        <div className="alert alert-primary" role="alert">
          Be kind 🙏
        </div>

        <div className="row mt-4">
          <div className="col-2 sidebar">
            <Sidebar />
          </div>
          <div className="col-10">
            <Router>
              <Requests path={REQUESTS_PATH} default />
              <Request path={REQUEST_PATH} />
              <Dumps path={DUMPS_PATH} />
              <Logs path={LOGS_PATH} />
              <Log path={LOG_PATH} />
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
