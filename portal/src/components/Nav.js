import React from "react";

//Import Component
import EditCart from "./EditCart";

function Nav(props) {
  return (
    <React.Fragment>
      <nav className="navbar justify-content-between">
        <a className="navbar-brand">
          <h1>Cool Shop</h1>
        </a>
        <EditCart carts={props.carts} />
      </nav>
    </React.Fragment>
  );
}

export default Nav;
