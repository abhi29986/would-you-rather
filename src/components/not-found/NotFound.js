import React from "react";
import { NavLink } from "react-router-dom";

//Functional component for Page/Link Not Found . and link to go back to Login Page
export default () => {
  return (
    <div>
      <h1 className="center">Page Not Found</h1>
      <p className="center">Sorry, this page does not exist</p>
      <NavLink to="/" className="center">
        Click here{" "}
      </NavLink>{" "}
      to go back to home page
    </div>
  );
};
