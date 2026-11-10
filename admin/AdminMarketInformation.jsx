import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
  FaBullhorn,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaBuilding,
  FaStar,
} from "react-icons/fa";

import "./AdminMarketInformation.css";

function AdminMarketInformation() {

  const [loading, setLoading] = useState(true);

  // =====================================================
  // MARKET OVERVIEW
  // =====================================================

  const [overview, setOverview] = useState({
    categories: "20+",
    sections: "3",
    operatingHours: "17 Hrs",
    activeUsers: "1000+",
  });

  // =====================================================
  // OPERATING DAYS
  // =====================================================

  const [operatingDays, setOperatingDays] = useState({
    days: "Monday - Saturday",
    hours: "5:00 AM - 5:00 PM",
  });

  // =====================================================
  // ABOUT DDEC
  // =====================================================

  const [aboutDdec, setAboutDdec] = useState(
    "Dambulla Dedicated Economic Centre is one of the largest wholesale economic centres in Sri Lanka, facilitating the trade of agricultural products from farmers to traders efficiently."
  );

  // =====================================================
  // CONTACT INFORMATION
  // =====================================================

  const [contact, setContact] = useState({
    phone: "+94 66 228 2457",
    email: "dambulladec@gmail.com",
    location: "Dambulla, Sri Lanka",
  });

  // =====================================================
// LOAD MARKET INFORMATION FROM DATABASE
// =====================================================

useEffect(() => {

  fetch("http://localhost:5000/api/market-information")

    .then((response) => {

      if (!response.ok) {
        throw new Error("Failed to fetch market information");
      }

      return response.json();
    })

    .then((data) => {

      setOverview({
        categories: data.categories,
        sections: data.sections,
        operatingHours: data.operating_hours,
        activeUsers: data.active_users,
      });

      setOperatingDays({
        days: data.operating_days,
        hours: data.market_hours,
      });

      setAboutDdec(data.about_ddec);

      setContact({
        phone: data.phone,
        email: data.email,
        location: data.location,
      });

      setLoading(false);
    })

    .catch((error) => {

      console.error("Error loading market information:", error);

      setLoading(false);
    });

}, []);

// =====================================================
// LOAD ANNOUNCEMENTS FROM DATABASE
// =====================================================

useEffect(() => {

  fetch("http://localhost:5000/api/announcements")

    .then((response) => {

      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }

      return response.json();
    })

    .then((data) => {

      setAnnouncements(data);

    })

    .catch((error) => {

      console.error("Error loading announcements:", error);

    });

}, []);

  // =====================================================
  // ANNOUNCEMENTS
  // =====================================================

  const [announcements, setAnnouncements] = useState([]);

  // =====================================================
  // MARKET HIGHLIGHTS
  // =====================================================

  const [highlights, setHighlights] = useState([
    {
      id: 1,
      title: "Fresh Arrivals",
      description:
        "Daily fresh produce from all over Sri Lanka.",
    },
    {
      id: 2,
      title: "Quality Assured",
      description:
        "Quality checked and verified products.",
    },
    {
      id: 3,
      title: "Efficient Services",
      description:
        "Fast and reliable market support services.",
    },
    {
      id: 4,
      title: "Easy Navigation",
      description:
        "Simple layout for visitors and buyers.",
    },
  ]);

  // =====================================================
  // EDITING STATES
  // =====================================================

  const [editingSection, setEditingSection] = useState(null);

  const [showAnnouncementForm, setShowAnnouncementForm] =
    useState(false);

  const [showHighlightForm, setShowHighlightForm] =
    useState(false);

  // =====================================================
  // TEMPORARY ANNOUNCEMENT FORM
  // =====================================================

  const [newAnnouncement, setNewAnnouncement] = useState({
    text: "",
    date: "",
  });

  // =====================================================
  // TEMPORARY HIGHLIGHT FORM
  // =====================================================

  const [newHighlight, setNewHighlight] = useState({
    title: "",
    description: "",
  });

  // =====================================================
  // EDIT SECTION
  // =====================================================

  const handleEdit = (section) => {
    setEditingSection(section);
  };

  // =====================================================
  // SAVE SECTION
  // =====================================================

  const handleSave = async () => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/market-information/1",
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          categories: overview.categories,
          sections: overview.sections,
          operating_hours: overview.operatingHours,
          active_users: overview.activeUsers,

          operating_days: operatingDays.days,
          market_hours: operatingDays.hours,

          about_ddec: aboutDdec,

          phone: contact.phone,
          email: contact.email,
          location: contact.location,

        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setEditingSection(null);

    alert("Information updated successfully.");

  } catch (error) {

    console.error("Error updating market information:", error);

    alert("Failed to update market information.");

  }

};

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setEditingSection(null);
  };

  // =====================================================
  // ADD ANNOUNCEMENT
  // =====================================================

  // =====================================================
// ADD ANNOUNCEMENT
// =====================================================

const handleAddAnnouncement = async (e) => {

  e.preventDefault();

  if (!newAnnouncement.text.trim()) {
    alert("Please enter an announcement.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/announcements",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: newAnnouncement.text,
          date: newAnnouncement.date || "Today",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setAnnouncements((prevAnnouncements) => [
  data,
  ...prevAnnouncements,
]);

setNewAnnouncement({
  text: "",
  date: "",
});

    setShowAnnouncementForm(false);

    alert("Announcement added successfully.");

  } catch (error) {

    console.error("Error adding announcement:", error);

    alert("Failed to add announcement.");

  }

};
  // =====================================================
  // DELETE ANNOUNCEMENT
  // =====================================================

  const handleDeleteAnnouncement = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this announcement?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `http://localhost:5000/api/announcements/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter(
        (announcement) =>
          announcement.id !== id
      )
    );

    alert("Announcement deleted successfully.");

  } catch (error) {

    console.error(
      "Error deleting announcement:",
      error
    );

    alert("Failed to delete announcement.");

  }

};
  // =====================================================
  // ADD HIGHLIGHT
  // =====================================================

  const handleAddHighlight = async (e) => {

  e.preventDefault();

  if (
    !newHighlight.title.trim() ||
    !newHighlight.description.trim()
  ) {
    alert("Please complete all fields.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/market-highlights",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: newHighlight.title,
          description: newHighlight.description,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setHighlights((prevHighlights) => [
      data,
      ...prevHighlights,
    ]);

    setNewHighlight({
      title: "",
      description: "",
    });

    setShowHighlightForm(false);

    alert("Market highlight added successfully.");

  } catch (error) {

    console.error(
      "Error adding market highlight:",
      error
    );

    alert("Failed to add market highlight.");

  }

};

  // =====================================================
  // DELETE HIGHLIGHT
  // =====================================================

  const handleDeleteHighlight = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this highlight?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `http://localhost:5000/api/market-highlights/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setHighlights((prevHighlights) =>
      prevHighlights.filter(
        (highlight) =>
          highlight.id !== id
      )
    );

    alert("Market highlight deleted successfully.");

  } catch (error) {

    console.error(
      "Error deleting market highlight:",
      error
    );

    alert("Failed to delete market highlight.");

  }

};

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <div className="admin-market-info">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="admin-market-banner">

  <div className="market-banner-content">

    <span className="market-banner-label">
      DDEC MARKET MANAGEMENT
    </span>

    <h1>
      Market Information Management
    </h1>

    <p>
      Manage market details, announcements and
      highlights displayed on the public website.
    </p>

  </div>

  <div className="market-banner-decoration">

    <div className="market-circle circle-one"></div>

    <div className="market-circle circle-two"></div>

    <div className="market-circle circle-three"></div>

  </div>

</div>


      {/* =================================================
          MARKET OVERVIEW
      ================================================= */}

      <section className="admin-info-card">

        <div className="admin-card-header">

          <div className="admin-card-title">

            <FaBuilding />

            <div>
              <h2>Market Overview</h2>

              <p>
                Manage the main market statistics.
              </p>
            </div>

          </div>

          {editingSection !== "overview" && (
            <button
              className="admin-edit-button"
              onClick={() =>
                handleEdit("overview")
              }
            >
              <FaEdit />
              Edit
            </button>
          )}

        </div>


        {editingSection === "overview" ? (

          <div className="admin-edit-form">

            <div className="form-grid">

              <div className="admin-form-group">
                <label>Categories Available</label>

                <input
                  value={overview.categories}
                  onChange={(e) =>
                    setOverview({
                      ...overview,
                      categories: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Main Sections</label>

                <input
                  value={overview.sections}
                  onChange={(e) =>
                    setOverview({
                      ...overview,
                      sections: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Daily Operations</label>

                <input
                  value={overview.operatingHours}
                  onChange={(e) =>
                    setOverview({
                      ...overview,
                      operatingHours:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Active Users</label>

                <input
                  value={overview.activeUsers}
                  onChange={(e) =>
                    setOverview({
                      ...overview,
                      activeUsers:
                        e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="form-actions">

              <button
                className="save-button"
                onClick={handleSave}
              >
                <FaSave />
                Save Changes
              </button>

              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                <FaTimes />
                Cancel
              </button>

            </div>

          </div>

        ) : (

          <div className="overview-display">

            <div>
              <strong>
                {overview.categories}
              </strong>
              <span>Categories Available</span>
            </div>

            <div>
              <strong>
                {overview.sections}
              </strong>
              <span>Main Sections</span>
            </div>

            <div>
              <strong>
                {overview.operatingHours}
              </strong>
              <span>Daily Operations</span>
            </div>

            <div>
              <strong>
                {overview.activeUsers}
              </strong>
              <span>Active Users</span>
            </div>

          </div>

        )}

      </section>


      {/* =================================================
          OPERATING DAYS
      ================================================= */}

      <section className="admin-info-card">

        <div className="admin-card-header">

          <div className="admin-card-title">

            <FaClock />

            <div>
              <h2>Operating Days</h2>

              <p>
                Manage market operating days and hours.
              </p>
            </div>

          </div>

          {editingSection !== "operating" && (
            <button
              className="admin-edit-button"
              onClick={() =>
                handleEdit("operating")
              }
            >
              <FaEdit />
              Edit
            </button>
          )}

        </div>


        {editingSection === "operating" ? (

          <div className="admin-edit-form">

            <div className="form-grid">

              <div className="admin-form-group">
                <label>Operating Days</label>

                <input
                  value={operatingDays.days}
                  onChange={(e) =>
                    setOperatingDays({
                      ...operatingDays,
                      days: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Operating Hours</label>

                <input
                  value={operatingDays.hours}
                  onChange={(e) =>
                    setOperatingDays({
                      ...operatingDays,
                      hours: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="form-actions">

              <button
                className="save-button"
                onClick={handleSave}
              >
                <FaSave />
                Save Changes
              </button>

              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                <FaTimes />
                Cancel
              </button>

            </div>

          </div>

        ) : (

          <div className="operating-display">

            <div>
              <span>Operating Days</span>
              <strong>
                {operatingDays.days}
              </strong>
            </div>

            <div>
              <span>Operating Hours</span>
              <strong>
                {operatingDays.hours}
              </strong>
            </div>

          </div>

        )}

      </section>


      {/* =================================================
          ABOUT DDEC
      ================================================= */}

      <section className="admin-info-card">

        <div className="admin-card-header">

          <div className="admin-card-title">

            <FaInfoCircle />

            <div>
              <h2>About DDEC</h2>

              <p>
                Manage the description displayed
                on the public website.
              </p>
            </div>

          </div>

          {editingSection !== "about" && (
            <button
              className="admin-edit-button"
              onClick={() =>
                handleEdit("about")
              }
            >
              <FaEdit />
              Edit
            </button>
          )}

        </div>


        {editingSection === "about" ? (

          <div className="admin-edit-form">

            <div className="admin-form-group">

              <label>
                About DDEC Description
              </label>

              <textarea
                rows="5"
                value={aboutDdec}
                onChange={(e) =>
                  setAboutDdec(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-actions">

              <button
                className="save-button"
                onClick={handleSave}
              >
                <FaSave />
                Save Changes
              </button>

              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                <FaTimes />
                Cancel
              </button>

            </div>

          </div>

        ) : (

          <div className="about-display">

            <p>
              {aboutDdec}
            </p>

          </div>

        )}

      </section>


      {/* =================================================
          CONTACT INFORMATION
      ================================================= */}

      <section className="admin-info-card">

        <div className="admin-card-header">

          <div className="admin-card-title">

            <FaPhone />

            <div>
              <h2>Contact Information</h2>

              <p>
                Manage public contact details.
              </p>
            </div>

          </div>

          {editingSection !== "contact" && (
            <button
              className="admin-edit-button"
              onClick={() =>
                handleEdit("contact")
              }
            >
              <FaEdit />
              Edit
            </button>
          )}

        </div>


        {editingSection === "contact" ? (

          <div className="admin-edit-form">

            <div className="form-grid">

              <div className="admin-form-group">
                <label>Phone Number</label>

                <input
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Email Address</label>

                <input
                  value={contact.email}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-form-group full-width">
                <label>Location</label>

                <input
                  value={contact.location}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      location:
                        e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="form-actions">

              <button
                className="save-button"
                onClick={handleSave}
              >
                <FaSave />
                Save Changes
              </button>

              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                <FaTimes />
                Cancel
              </button>

            </div>

          </div>

        ) : (

          <div className="contact-display">

            <div>
              <FaPhone />
              <span>{contact.phone}</span>
            </div>

            <div>
              <FaMapMarkerAlt />
              <span>{contact.location}</span>
            </div>

            <div>
              <FaInfoCircle />
              <span>{contact.email}</span>
            </div>

          </div>

        )}

      </section>


      {/* =================================================
          ANNOUNCEMENTS
      ================================================= */}

      <section className="admin-info-card">

        <div className="admin-card-header">

          <div className="admin-card-title">

            <FaBullhorn />

            <div>
              <h2>Latest Announcements</h2>

              <p>
                Manage announcements displayed
                on the public website.
              </p>
            </div>

          </div>

          <button
            className="admin-add-button"
            onClick={() =>
              setShowAnnouncementForm(true)
            }
          >
            <FaPlus />
            Add Announcement
          </button>

        </div>


        {/* ANNOUNCEMENT FORM */}

        {showAnnouncementForm && (

          <form
            className="announcement-form"
            onSubmit={handleAddAnnouncement}
          >

            <div className="admin-form-group">

              <label>
                Announcement
              </label>

              <input
                type="text"
                placeholder="Enter announcement"
                value={
                  newAnnouncement.text
                }
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    text: e.target.value,
                  })
                }
              />

            </div>

            <div className="admin-form-group">

              <label>
                Date
              </label>

              <input
                type="text"
                placeholder="e.g. August 17, 2026"
                value={
                  newAnnouncement.date
                }
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    date: e.target.value,
                  })
                }
              />

            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="save-button"
              >
                <FaSave />
                Add
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  setShowAnnouncementForm(false)
                }
              >
                Cancel
              </button>

            </div>

          </form>

        )}


        {/* ANNOUNCEMENT LIST */}

        <div className="announcement-list">

          {announcements.map(
            (announcement) => (

              <div
                className="announcement-item"
                key={announcement.id}
              >

                <div className="announcement-icon">
                  <FaBullhorn />
                </div>

                <div className="announcement-content">

                  <strong>
                    {announcement.text}
                  </strong>

                  <span>
                    {announcement.date}
                  </span>

                </div>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDeleteAnnouncement(
                      announcement.id
                    )
                  }
                >
                  <FaTrash />
                </button>

              </div>

            )
          )}

        </div>

      </section>


      {/* =================================================
          MARKET HIGHLIGHTS
      ================================================= */}

      <section className="admin-info-card">

        <div className="admin-card-header">

          <div className="admin-card-title">

            <FaStar />

            <div>
              <h2>Market Highlights</h2>

              <p>
                Manage the highlights shown
                on the public website.
              </p>
            </div>

          </div>

          <button
            className="admin-add-button"
            onClick={() =>
              setShowHighlightForm(true)
            }
          >
            <FaPlus />
            Add Highlight
          </button>

        </div>


        {/* HIGHLIGHT FORM */}

        {showHighlightForm && (

          <form
            className="announcement-form"
            onSubmit={handleAddHighlight}
          >

            <div className="admin-form-group">

              <label>
                Highlight Title
              </label>

              <input
                type="text"
                placeholder="e.g. Fresh Arrivals"
                value={
                  newHighlight.title
                }
                onChange={(e) =>
                  setNewHighlight({
                    ...newHighlight,
                    title: e.target.value,
                  })
                }
              />

            </div>


            <div className="admin-form-group">

              <label>
                Description
              </label>

              <textarea
                rows="3"
                placeholder="Enter description"
                value={
                  newHighlight.description
                }
                onChange={(e) =>
                  setNewHighlight({
                    ...newHighlight,
                    description:
                      e.target.value,
                  })
                }
              />

            </div>


            <div className="form-actions">

              <button
                type="submit"
                className="save-button"
              >
                <FaSave />
                Add
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  setShowHighlightForm(false)
                }
              >
                Cancel
              </button>

            </div>

          </form>

        )}


        {/* HIGHLIGHT LIST */}

        <div className="highlight-list">

          {highlights.map(
            (highlight) => (

              <div
                className="highlight-item"
                key={highlight.id}
              >

                <div className="highlight-icon">
                  <FaStar />
                </div>

                <div className="highlight-content">

                  <strong>
                    {highlight.title}
                  </strong>

                  <p>
                    {highlight.description}
                  </p>

                </div>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDeleteHighlight(
                      highlight.id
                    )
                  }
                >
                  <FaTrash />
                </button>

              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
}

export default AdminMarketInformation;