import React from "react";
import "./AdminDashboard.css";
import { useNavigate, NavLink } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaBell,
  FaCalendarAlt,
  FaShoppingBag,
  FaTruck,
  FaBullhorn,
  FaUser,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";

// DDEC Logo
import ddecLogo from "../assets/images/logo.png";


function AdminDashboard() {

  const navigate = useNavigate();


  // ================= LOGOUT =================

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };


  // ================= MARKET DATA =================

  const marketData = [
    { date: "12-May", viewers: 1200 },
    { date: "13-May", viewers: 2800 },
    { date: "14-May", viewers: 4100 },
    { date: "15-May", viewers: 4500 },
    { date: "16-May", viewers: 5800 },
    { date: "17-May", viewers: 5100 },
    { date: "18-May", viewers: 6900 },
  ];


  return (

    <div className="admin-dashboard">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="admin-sidebar">


        {/* ================= DDEC BRAND ================= */}

        <div className="sidebar-brand">

          <img
            src={ddecLogo}
            alt="DDEC Logo"
            className="ddec-logo"
          />

          <h2>DDEC</h2>

          <p>Dambulla Dedicated</p>
          <p>Economic Centre</p>

          <span>Market Information System</span>

        </div>


        {/* ================= SIDEBAR MENU ================= */}

        <div className="sidebar-menu">


          {/* Dashboard */}

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            Dashboard
          </NavLink>


          {/* Market Information */}

          <NavLink
            to="/admin/market-information"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            Market Information
          </NavLink>


          {/* Product Categories */}

          <NavLink
            to="/admin/product-categories"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            Product Categories
          </NavLink>


          {/* Stakeholders */}

          <NavLink
            to="/admin/stakeholders"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            Stakeholders
          </NavLink>


          {/* Transport */}

          <NavLink
            to="/admin/transport"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            Transport
          </NavLink>


        </div>


        {/* =====================================================
            SIDEBAR BOTTOM
        ===================================================== */}

        <div className="sidebar-bottom">


          {/* Admin User */}

          <div className="admin-user">

            <FaUser />

            <span>Admin User</span>

          </div>


          {/* Logout */}

          <button
            className="logout-button"
            onClick={handleLogout}
          >

            <FaSignOutAlt />

            <span>Logout</span>

          </button>


        </div>


      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="admin-main">


        {/* ================= DASHBOARD HEADER ================= */}

        <header className="admin-dashboard-header">


          <h1>Dashboard</h1>


          <div className="dashboard-header-right">

            <FaBell className="notification-icon" />


            <div className="date-time">

              <FaCalendarAlt />

              <span>
                July 1, 2026 | 10:30 am
              </span>

            </div>

          </div>


        </header>


        {/* ================= DASHBOARD CONTENT ================= */}

        <div className="dashboard-content">


          {/* ================= WELCOME ================= */}

          <section className="dashboard-banner">

  <div className="banner-content">

    <span className="banner-label">
      DDEC ADMIN PORTAL
    </span>

    <h2>
      Welcome back, Admin!
    </h2>

    <p>
      Manage the DDEC Market Information System
      and keep market information up to date.
    </p>

    <button
      className="banner-button"
      onClick={() => navigate("/admin/market-information")}
    >
      Manage Market Information
    </button>

  </div>

  <div className="banner-decoration">
    <div className="decoration-circle circle-one"></div>
    <div className="decoration-circle circle-two"></div>
    <div className="decoration-circle circle-three"></div>
  </div>

</section>


          {/* =====================================================
              STATISTICS
          ===================================================== */}

          <section className="stats-container">


            {/* Total Products */}

            <div className="stat-card">

              <div className="stat-icon products-icon">

                <FaShoppingBag />

              </div>


              <div className="stat-details">

                <h3>Total Products</h3>

                <strong>45</strong>

                <p>9+ this month</p>

              </div>

            </div>


            {/* Transport Services */}

            <div className="stat-card">

              <div className="stat-icon transport-icon">

                <FaTruck />

              </div>


              <div className="stat-details">

                <h3>Transport Services</h3>

                <strong>10</strong>

                <p>2+ this month</p>

              </div>

            </div>


            {/* Announcements */}

            <div className="stat-card">

              <div className="stat-icon announcement-icon">

                <FaBullhorn />

              </div>


              <div className="stat-details">

                <h3>Announcements</h3>

                <strong>7</strong>

                <p>1+ this month</p>

              </div>

            </div>


          </section>


          {/* =====================================================
              LOWER DASHBOARD
          ===================================================== */}

          <section className="dashboard-lower">


            {/* ================= MARKET OVERVIEW ================= */}

            <div className="market-overview">


              <h2>Market Overview</h2>


              <div className="chart-area">

                <ResponsiveContainer
                  width="100%"
                  height={220}
                >

                  <LineChart
                    data={marketData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 9 }}
                    />

                    <YAxis
                      tick={{ fontSize: 9 }}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="viewers"
                      stroke="#29824d"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>


              {/* Page Viewers */}

              <div className="page-viewers">

                <FaChartLine />


                <div>

                  <h3>Total page viewers</h3>

                  <strong>8763</strong>

                </div>

              </div>


            </div>


            {/* ================= RECENT ACTIVITIES ================= */}

            <div className="recent-activities">


              <h2>Recent Activities</h2>


              {/* Activity 1 */}

              <div className="activity-item">

                <FaShoppingBag />

                <div>

                  <strong>
                    Added a new product
                  </strong>

                  <p>
                    "Jackfruit" in vegetables
                  </p>

                </div>

                <span>2 min</span>

              </div>


              {/* Activity 2 */}

              <div className="activity-item">

                <FaTruck />

                <div>

                  <strong>
                    Updated transport information
                  </strong>

                  <p>
                    for 10 tyre truck
                  </p>

                </div>

                <span>20 min</span>

              </div>


              {/* Activity 3 */}

              <div className="activity-item">

                <FaBullhorn />

                <div>

                  <strong>
                    Published new announcements
                  </strong>

                </div>

                <span>15 min</span>

              </div>


              {/* Activity 4 */}

              <div className="activity-item">

                <FaShoppingBag />

                <div>

                  <strong>
                    Updated product category
                  </strong>

                  <p>
                    "Leafy Greens"
                  </p>

                </div>

                <span>1 hr</span>

              </div>


            </div>


          </section>


        </div>


      </main>


    </div>
  );
}


export default AdminDashboard;