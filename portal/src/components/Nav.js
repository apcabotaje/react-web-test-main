import React from "react";

//Import Component
import EditCart from "./EditCart";

function Nav() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">
          <h1>Cool Shop</h1>
        </a>
        <EditCart />
      </nav>
    </React.Fragment>
  );
}

export default Nav;
