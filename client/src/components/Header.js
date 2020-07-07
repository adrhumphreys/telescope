import React from "react";
import { Link } from "@reach/router";
import { BASE_PATH } from "../constants";

function Header() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to={BASE_PATH} className="navbar-brand mb-0 h1">
          Telescope 🔭
        </Link>
        <span className="trash-panda">
          trash panda 🦝
          <img
            aria-hidden
            loading="lazy"
            src="https://media.giphy.com/media/X1fikdyut2uv6/giphy.gif"
          />
        </span>
      </div>
    </nav>
  );
}

export default Header;
