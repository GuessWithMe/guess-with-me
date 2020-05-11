import React from "react";
import config from "../../config";

const Landing = () => {
  return (
    <div>
      <h1>Landing</h1>
      <p>
        <a href={`${config.apiUrl}/auth/spotify`}>Sign in</a>
      </p>
    </div>
  );
};

export default Landing;
