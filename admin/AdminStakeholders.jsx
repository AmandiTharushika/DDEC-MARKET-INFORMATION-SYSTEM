import React, { useState } from "react";
import "./AdminStakeholders.css";

import {
  FaUserTie,
  FaStore,
  FaTruck,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const initialStakeholders = [
  {
    id: 1,
    name: "Farmers",
    description:
      "Local farmers who produce fresh vegetables, fruits and agricultural products.",
    icon: "farmer",
    status: "Active",
  },
  {
    id: 2,
    name: "Buyers",
    description:
      "Wholesalers and retailers purchasing products from DDEC.",
    icon: "buyer",
    status: "Active",
  },
  {
    id: 3,
    name: "Transporters",
    description:
      "Transport operators moving products safely and efficiently.",
    icon: "transport",
    status: "Active",
  },
  {
    id: 4,
    name: "Community",
    description:
      "Local community supporting the DDEC market.",
    icon: "community",
    status: "Active",
  },
];

function AdminStakeholders() {
  const [stakeholders, setStakeholders] = useState(initialStakeholders);

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingStakeholder, setEditingStakeholder] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  // Get icon according to stakeholder type
  const getIcon = (icon) => {
    if (icon === "farmer") {
      return <FaUserTie />;
    }

    if (icon === "buyer") {
      return <FaStore />;
    }

    if (icon === "transport") {
      return <FaTruck />;
    }

    return <FaUsers />;
  };

  // Open Add Modal
  const handleAdd = () => {
    setEditingStakeholder(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (stakeholder) => {
    setEditingStakeholder(stakeholder);

    setFormData({
      name: stakeholder.name,
      description: stakeholder.description,
      status: stakeholder.status,
    });

    setShowModal(true);
  };

  // Delete stakeholder
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stakeholder?"
    );

    if (confirmDelete) {
      setStakeholders(
        stakeholders.filter((stakeholder) => stakeholder.id !== id)
      );
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save stakeholder
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingStakeholder) {
      setStakeholders(
        stakeholders.map((stakeholder) =>
          stakeholder.id === editingStakeholder.id
            ? {
                ...stakeholder,
                name: formData.name,
                description: formData.description,
                status: formData.status,
              }
            : stakeholder
        )
      );
    } else {
      const newStakeholder = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        status: formData.status,
        icon: "community",
      };

      setStakeholders([...stakeholders, newStakeholder]);
    }

    setShowModal(false);
  };

  // Search
  const filteredStakeholders = stakeholders.filter((stakeholder) =>
    stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-stakeholder-page">

      {/* Page Banner */}
<div className="stakeholder-banner">

  <div className="stakeholder-banner-content">

    <div>
      <h1>Stakeholder Management</h1>

      <p>
        Manage stakeholder information displayed on the public website.
      </p>
    </div>

    <button
      className="add-stakeholder-btn"
      onClick={handleAdd}
    >
      <FaPlus />
      Add Stakeholder
    </button>

  </div>

</div>
      {/* Search */}
      <div className="stakeholder-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search stakeholders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      {/* Stakeholder Table */}
      <div className="stakeholder-table-container">

        <table className="stakeholder-table">

          <thead>
            <tr>
              <th>Stakeholder</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredStakeholders.length > 0 ? (

              filteredStakeholders.map((stakeholder) => (

                <tr key={stakeholder.id}>

                  {/* Stakeholder */}
                  <td>

                    <div className="stakeholder-name">

                      <div className="stakeholder-icon">
                        {getIcon(stakeholder.icon)}
                      </div>

                      <span>{stakeholder.name}</span>

                    </div>

                  </td>

                  {/* Description */}
                  <td className="description-cell">
                    {stakeholder.description}
                  </td>

                  {/* Status */}
                  <td>

                    <span
                      className={
                        stakeholder.status === "Active"
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {stakeholder.status}
                    </span>

                  </td>

                  {/* Actions */}
                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(stakeholder)}
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(stakeholder.id)}
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="4" className="no-results">
                  No stakeholders found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Add / Edit Modal */}
      {showModal && (

        <div className="stakeholder-modal-overlay">

          <div className="stakeholder-modal">

            <div className="modal-header">

              <h2>
                {editingStakeholder
                  ? "Edit Stakeholder"
                  : "Add Stakeholder"}
              </h2>

              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>Stakeholder Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter stakeholder name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Enter stakeholder description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />

              </div>

              <div className="form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingStakeholder ? "Update" : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminStakeholders;