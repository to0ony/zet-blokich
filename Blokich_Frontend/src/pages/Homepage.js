import React from "react";
import DriverLogin from "../components/DriverLogin";
import "../style/homepage.css";

function Homepage() {
  return (
    <div>
      <h1>ZET Blokich</h1>
      <div className="login-block">
        <DriverLogin />
      </div>
    </div>
  );
}

export default Homepage;
