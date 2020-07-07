import React from "react";

function Requests() {
  return (
    <div className="table-responsive">
      <table className="table mb-0 card-bg-secondary table-borderless">
        <thead>
          <tr>
            <th scope="col">Verb</th>
            <th scope="col">Path</th>
            <th scope="col">Status</th>
            <th scope="col">Happened</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="table-fit font-weight-bold badge">
              <span className="badge bg-secondary text-dark">GET</span>
            </td>
            <td className="table-fit pr-0">/</td>
            <td className="table-fit pr-0">
              <span className="badge bg-secondary text-dark">200</span>
            </td>
            <td className="table-fit pr-0">Just now</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Requests;
