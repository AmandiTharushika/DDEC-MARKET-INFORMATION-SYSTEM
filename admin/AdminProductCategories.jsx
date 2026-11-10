import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProductCategories.css";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";

function AdminProductCategories() {
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryList, setCategoryList] = useState([
    {
      id: 1,
      name: "Vegetables",
      description: "Fresh vegetables available at DDEC",
      products: 15,
      status: "Active",
    },
    {
      id: 2,
      name: "Fruits",
      description: "Fresh fruits available at DDEC",
      products: 9,
      status: "Active",
    },
    {
      id: 3,
      name: "Leafy Greens",
      description: "Fresh leafy green vegetables",
      products: 5,
      status: "Active",
    },
    {
      id: 4,
      name: "Root Crops",
      description: "Root and tuber crops",
      products: 4,
      status: "Active",
    },
    {
      id: 5,
      name: "Pulses & Grains",
      description: "Pulses, grains and related products",
      products: 5,
      status: "Active",
    },
  ]);

  // SEARCH CATEGORIES
  const filteredCategories = categoryList.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =========================================
  // ADD / EDIT CATEGORY
  // =========================================

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    // EDIT CATEGORY
    if (editingCategory) {
      setCategoryList((currentCategories) =>
        currentCategories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: categoryName.trim(),
                description:
                  categoryDescription.trim() ||
                  "No description provided",
              }
            : category
        )
      );

      closeCategoryModal();

      return;
    }

    // ADD NEW CATEGORY
    const newCategory = {
      id:
        categoryList.length > 0
          ? Math.max(...categoryList.map((category) => category.id)) + 1
          : 1,

      name: categoryName.trim(),

      description:
        categoryDescription.trim() ||
        "No description provided",

      products: 0,

      status: "Active",
    };

    setCategoryList((currentCategories) => [
      ...currentCategories,
      newCategory,
    ]);

    closeCategoryModal();
  };

  // =========================================
  // EDIT CATEGORY
  // =========================================

  const handleEditCategory = (category) => {
    setEditingCategory(category);

    setCategoryName(category.name);

    setCategoryDescription(category.description);

    setShowAddModal(true);
  };

  // =========================================
  // CLOSE CATEGORY MODAL
  // =========================================

  const closeCategoryModal = () => {
    setShowAddModal(false);

    setEditingCategory(null);

    setCategoryName("");

    setCategoryDescription("");
  };

  // =========================================
  // DELETE CATEGORY
  // =========================================

  const handleDeleteCategory = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    setCategoryList((currentCategories) =>
      currentCategories.filter(
        (category) => category.id !== id
      )
    );
  };

  // =========================================
  // OPEN ADD CATEGORY MODAL
  // =========================================

  const openAddCategoryModal = () => {
    setEditingCategory(null);

    setCategoryName("");

    setCategoryDescription("");

    setShowAddModal(true);
  };

  return (
    <div className="admin-category-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="category-page-banner">

  <div className="category-banner-content">

    <span className="category-banner-label">
      DDEC PRODUCT MANAGEMENT
    </span>

    <h1>
      Product Category Management
    </h1>

    <p>
      Manage product categories and maintain market
      product information.
    </p>

  </div>

  <button
    type="button"
    className="add-category-button"
    onClick={openAddCategoryModal}
  >
    <FaPlus />
    Add Category
  </button>

  <div className="category-banner-decoration">

    <div className="category-circle circle-one"></div>
    <div className="category-circle circle-two"></div>
    <div className="category-circle circle-three"></div>

  </div>

</div>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div className="category-summary">

        {/* Total Categories */}

        <div className="category-summary-card">

          <div className="summary-icon">
            <FaBoxOpen />
          </div>

          <div>

            <span>
              Total Categories
            </span>

            <strong>
              {categoryList.length}
            </strong>

          </div>

        </div>


        {/* Active Categories */}

        <div className="category-summary-card">

          <div className="summary-icon">
            <FaCheckCircle />
          </div>

          <div>

            <span>
              Active Categories
            </span>

            <strong>
              {
                categoryList.filter(
                  (category) =>
                    category.status === "Active"
                ).length
              }
            </strong>

          </div>

        </div>


        {/* Total Products */}

        <div className="category-summary-card">

          <div className="summary-icon">
            <FaBoxOpen />
          </div>

          <div>

            <span>
              Total Products
            </span>

            <strong>
              {
                categoryList.reduce(
                  (total, category) =>
                    total + category.products,
                  0
                )
              }
            </strong>

          </div>

        </div>

      </div>


      {/* =========================================
          MANAGEMENT CARD
      ========================================= */}

      <div className="category-management-card">

        {/* Card Header */}

        <div className="category-card-header">

          <div>

            <h2>
              Product Categories
            </h2>

            <p>
              View and manage available product categories.
            </p>

          </div>


          {/* Search */}

          <div className="category-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

        </div>


        {/* =========================================
            CATEGORY TABLE
        ========================================= */}

        <div className="category-table-container">

          <table className="category-table">

            <thead>

              <tr>

                <th>#</th>

                <th>
                  Category
                </th>

                <th>
                  Description
                </th>

                <th>
                  Products
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCategories.length > 0 ? (

                filteredCategories.map((category) => (

                  <tr key={category.id}>

                    {/* ID */}

                    <td>
                      {category.id}
                    </td>


                    {/* Category */}

                    <td>

                      <div className="category-name">

                        <div className="category-small-icon">
                          <FaBoxOpen />
                        </div>

                        <strong
  className="clickable-category"
  onClick={() => {
    const categoryRoutes = {
      "Vegetables": "vegetables",
      "Fruits": "fruits",
      "Leafy Greens": "leafy-greens",
      "Root Crops": "root-crops",
      "Pulses & Grains": "pulses-grains",
    };

    const route = categoryRoutes[category.name];

    if (route) {
      navigate(`/admin/products/${route}`);
    }
  }}
>
  {category.name}
</strong>

                      </div>

                    </td>


                    {/* Description */}

                    <td>
                      {category.description}
                    </td>


                    {/* Products */}

                    <td>

                      <span className="product-count">
                        {category.products}
                      </span>

                    </td>


                    {/* Status */}

                    <td>

                      <span className="status-badge">

                        <FaCheckCircle />

                        {category.status}

                      </span>

                    </td>


                    {/* Actions */}

                    <td>

                      <div className="action-buttons">

                        {/* EDIT */}

                        <button
                          type="button"
                          className="edit-button"
                          title="Edit Category"
                          onClick={() =>
                            handleEditCategory(category)
                          }
                        >

                          <FaEdit />

                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          className="delete-button"
                          title="Delete Category"
                          onClick={() =>
                            handleDeleteCategory(
                              category.id
                            )
                          }
                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No categories found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================================
          ADD / EDIT CATEGORY MODAL
      ========================================= */}

      {showAddModal && (

        <div className="category-modal-overlay">

          <div className="category-modal">

            {/* Modal Header */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Add New Category"}
                </h2>

                <p>
                  {editingCategory
                    ? "Update the product category information."
                    : "Create a new product category."}
                </p>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                className="modal-close"
                onClick={closeCategoryModal}
              >
                ×
              </button>

            </div>


            {/* Form */}

            <form onSubmit={handleAddCategory}>

              {/* Category Name */}

              <div className="modal-form-group">

                <label>
                  Category Name
                </label>

                <input
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                  required
                />

              </div>


              {/* Description */}

              <div className="modal-form-group">

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Enter category description"
                  value={categoryDescription}
                  onChange={(e) =>
                    setCategoryDescription(
                      e.target.value
                    )
                  }
                  rows="4"
                />

              </div>


              {/* Modal Actions */}

              <div className="modal-actions">

                {/* CANCEL */}

                <button
                  type="button"
                  className="cancel-modal-button"
                  onClick={closeCategoryModal}
                >
                  Cancel
                </button>


                {/* ADD / UPDATE */}

                <button
                  type="submit"
                  className="save-category-button"
                >
                  {editingCategory
                    ? "Update Category"
                    : "Add Category"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProductCategories;