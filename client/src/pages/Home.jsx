import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Homepage</h1>
      <div>
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

      <div>
        <button type="button" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomePage;
