import React from "react";
import { SpaceIcon } from "../helpers/icons";

function EmptyContent(props) {
  const { title } = { title: "Nothing found", ...props };

  return (
    <div className="background-secondary box-shadow">
      <h1 className="header">{title}</h1>
      <div className="d-flex flex-column align-items-center justify-content-center card-bg-secondary p-5 bottom-radius">
        <SpaceIcon />
        <span>We didn't find anything - just empty space.</span>
      </div>
    </div>
  );
}

export default EmptyContent;
