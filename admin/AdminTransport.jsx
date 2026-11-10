import React, { useState } from "react";
import "./AdminTransport.css";

function AdminTransport() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: "6-Tire Truck",
      contact: "+94 77 123 4567",
      area: "Dambulla to Colombo",
      status: "Available",
    },
    {
      id: 2,
      type: "10-Tire Truck",
      contact: "+94 71 234 5678",
      area: "Dambulla to Kandy",
      status: "Available",
    },
    {
      id: 3,
      type: "Delivery Van",
      contact: "+94 76 345 6789",
      area: "Dambulla Area",
      status: "Available",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    contact: "",
    area: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVehicle = {
      id: Date.now(),
      ...formData,
    };

    setVehicles([...vehicles, newVehicle]);

    setFormData({
      type: "",
      contact: "",
      area: "",
      status: "Available",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transport service?"
    );

    if (confirmDelete) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    }
  };

  return (
    <div className="admin-transport-page">

      {/* Page Header */}
      <div className="transport-header">
        <div>
          <h1>Transport Management</h1>
          <p>
            Manage vehicle information, contact details and delivery areas.
          </p>
        </div>

        <button
  className="add-transport-btn"
  onClick={() => setShowForm(!showForm)}
>
  + Add Vehicle
</button>
      </div>

      {/* Add Transport Form */}
      {showForm && (
        <div className="transport-form-card">

          <h2>Add New Transport Service</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">
                <label>Vehicle Type</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Vehicle</option>
                  <option value="6-Tire Truck">6-Tire Truck</option>
                  <option value="10-Tire Truck">10-Tire Truck</option>
                  <option value="12-Tire Truck">12-Tire Truck</option>
                  <option value="Delivery Van">Delivery Van</option>
                  <option value="Three-Wheeler">Three-Wheeler</option>
                </select>
              </div>

              <div className="form-group">
                <label>Contact Number</label>

                <input
                  type="text"
                  name="contact"
                  placeholder="Enter contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Main Delivery Area</label>

                <input
                  type="text"
                  name="area"
                  placeholder="Example: Dambulla to Colombo"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

            </div>

            <div className="form-buttons">

              <button type="submit" className="save-btn">
                Save Transport
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Transport Information */}
      <div className="transport-card">

        <div className="card-title">
          <div>
            <h2>Transport Services</h2>
            <p>
              Current vehicle and delivery service information
            </p>
          </div>

          <span className="vehicle-count">
            {vehicles.length} Services
          </span>
        </div>

        {/* Table */}
        <div className="transport-table-container">

          <table className="transport-table">

            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Contact Information</th>
                <th>Delivery Area</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>

                  <td>
                    <strong>{vehicle.type}</strong>
                  </td>

                  <td>
                    {vehicle.contact}
                  </td>

                  <td>
                    {vehicle.area}
                  </td>

                  <td>
                    <span
                      className={
                        vehicle.status === "Available"
                          ? "status available"
                          : "status unavailable"
                      }
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminTransport;