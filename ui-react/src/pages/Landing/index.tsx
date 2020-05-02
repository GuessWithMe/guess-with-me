import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Landing</h1>
      <p>
        <Link to="/room/show">Room show</Link>
      </p>
    </div>
  );
};

export default Landing;
