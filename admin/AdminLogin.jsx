import React from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

import {
  FaLock,
  FaShieldAlt,
  FaClipboardList,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

// Change this path if your logo has a different filename/location
import logo from "../assets/images/logo.png";

function AdminLogin() {
   const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  try {

    const response = await fetch(
      "http://localhost:5000/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    if (response.ok) {

      sessionStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin/dashboard");

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(
      "Error connecting to backend:",
      error
    );

    alert(
      "Unable to connect to the server. Please make sure the backend is running."
    );

  }
};

  return (
    <div className="admin-login-page">

      {/* ================= LEFT SECTION ================= */}
      <section className="admin-login-left">

        {/* Logo and Organization Name */}
        <div className="admin-brand">
          <img
            src={logo}
            alt="Dambulla Dedicated Economic Centre Logo"
          />

          <h2>
            Dambulla Dedicated
            <br />
            Economic Centre
          </h2>
        </div>

        {/* Introduction */}
        <div className="admin-introduction">
          <h1>Market Information System Admin Portal</h1>

          <p>
            Secure access for administrators to manage market
            information and system content
          </p>
        </div>

        {/* Admin Features */}
        <div className="admin-features">

          <div className="admin-feature">
            <FaShieldAlt className="feature-icon" />
            <span>Secure Access</span>
          </div>

          <div className="admin-feature">
            <FaClipboardList className="feature-icon" />
            <span>Manage contents</span>
          </div>

          <div className="admin-feature">
            <FaUsers className="feature-icon" />
            <span>User Friendly</span>
          </div>

          <div className="admin-feature">
            <FaChartLine className="feature-icon" />
            <span>Real time updates</span>
          </div>

        </div>

      </section>


      {/* ================= RIGHT SECTION ================= */}
      <section className="admin-login-right">

        <div className="admin-login-card">

          {/* Lock Icon */}
          <div className="admin-lock-icon">
            <FaLock />
          </div>

          {/* Heading */}
          <h1>Admin Login</h1>

          <p className="admin-login-subtitle">
            Sign in to Access one last time
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                required
              />
            </div>


            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                required
              />
            </div>


            {/* Remember Me + Forgot Password */}
            <div className="login-options">

              <label className="remember-me">
                <input
                  type="checkbox"
                  name="remember"
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password
              </button>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="admin-login-button"
            >
              Log In
            </button>

          </form>


          {/* Secure Access Footer */}
          <div className="secure-access">

            <span></span>

            <p>Secure Admin Access</p>

            <span></span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminLogin;