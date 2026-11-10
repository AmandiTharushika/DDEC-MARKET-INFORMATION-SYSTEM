import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./AdminProducts.css";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function AdminProducts() {
  const { category } = useParams();
  const navigate = useNavigate();

  const categoryInformation = {
    vegetables: {
      name: "Vegetables",
      singular: "Vegetable",
    },
    fruits: {
      name: "Fruits",
      singular: "Fruit",
    },
    "leafy-greens": {
      name: "Leafy Greens",
      singular: "Leafy Green",
    },
    "root-crops": {
      name: "Root Crops",
      singular: "Root Crop",
    },
    "pulses-grains": {
      name: "Pulses & Grains",
      singular: "Product",
    },
  };

  const currentCategory =
    categoryInformation[category] ||
    categoryInformation.vegetables;

  const categoryName = currentCategory.name;
  const productLabel = currentCategory.singular;

  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);

  const [productName, setProductName] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [source, setSource] = useState("");

  const [dailyPrice, setDailyPrice] = useState("");
  const [priceDate, setPriceDate] = useState("");

  const [vegetablePrices, setVegetablePrices] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState(() => {
    if (category === "fruits") {
      return [
        {
          id: 1,
          name: "Banana",
          availability: "Available",
          source: "Dambulla",
        },
        {
          id: 2,
          name: "Mango",
          availability: "Available",
          source: "Jaffna",
        },
        {
          id: 3,
          name: "Papaya",
          availability: "Available",
          source: "Matale",
        },
      ];
    }

    if (category === "leafy-greens") {
      return [
        {
          id: 1,
          name: "Gotukola",
          availability: "Available",
          source: "Dambulla",
        },
        {
          id: 2,
          name: "Kangkung",
          availability: "Available",
          source: "Matale",
        },
        {
          id: 3,
          name: "Mukunuwenna",
          availability: "Available",
          source: "Dambulla",
        },
      ];
    }

    if (category === "root-crops") {
      return [
        {
          id: 1,
          name: "Potato",
          availability: "Available",
          source: "Nuwara Eliya",
        },
        {
          id: 2,
          name: "Sweet Potato",
          availability: "Available",
          source: "Badulla",
        },
        {
          id: 3,
          name: "Cassava",
          availability: "Available",
          source: "Kurunegala",
        },
      ];
    }

    if (category === "pulses-grains") {
      return [
        {
          id: 1,
          name: "Green Gram",
          availability: "Available",
          source: "Anuradhapura",
        },
        {
          id: 2,
          name: "Cowpea",
          availability: "Available",
          source: "Polonnaruwa",
        },
        {
          id: 3,
          name: "Rice",
          availability: "Available",
          source: "Kurunegala",
        },
      ];
    }

    return [
      {
        id: 1,
        name: "Carrot",
        availability: "Available",
        source: "Nuwara Eliya",
      },
      {
        id: 2,
        name: "Tomato",
        availability: "Available",
        source: "Dambulla",
      },
      {
        id: 3,
        name: "Cabbage",
        availability: "Available",
        source: "Nuwara Eliya",
      },
      {
        id: 4,
        name: "Brinjal",
        availability: "Available",
        source: "Dambulla",
      },
      {
        id: 5,
        name: "Pumpkin",
        availability: "Available",
        source: "Matale",
      },
    ];
  });

  // Fetch vegetable prices from MySQL
  useEffect(() => {
    if (category !== "vegetables") {
      return;
    }

    fetch("http://localhost:5000/api/vegetable-prices")
      .then((response) => response.json())
      .then((data) => {
        setVegetablePrices(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching vegetable prices:",
          error
        );
      });
  }, [category]);

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      alert(
        `Please enter a ${productLabel.toLowerCase()} name.`
      );
      return;
    }

    if (!source.trim()) {
      alert("Please enter the source region.");
      return;
    }

    if (category === "vegetables") {
      if (!dailyPrice) {
        alert("Please enter the daily price.");
        return;
      }

      if (!priceDate) {
        alert("Please select the price date.");
        return;
      }
    }

    if (editingProduct) {
  try {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: productName,
            availability: availability,
            source: source,
          }
        : product
    );

    setProducts(updatedProducts);

    // Update daily price and price date in MySQL
    if (category === "vegetables") {
      const priceRecord = vegetablePrices.find(
        (item) =>
          item.vegetable_name.trim().toLowerCase() ===
          editingProduct.name.trim().toLowerCase()
      );

      if (priceRecord) {
        const response = await fetch(
          `http://localhost:5000/api/vegetable-prices/${priceRecord.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              daily_price: dailyPrice,
              price_date: priceDate,
            }),
          }
        );

        if (!response.ok) {
  const errorData = await response.json();
  console.error("Backend error:", errorData);

  throw new Error(
    errorData.message || "Failed to update vegetable price"
  );
}

        // Update displayed price data
        setVegetablePrices((previousPrices) =>
          previousPrices.map((item) =>
            item.id === priceRecord.id
              ? {
                  ...item,
                  daily_price: dailyPrice,
                  price_date: priceDate,
                }
              : item
          )
        );
      }
    }

    setEditingProduct(null);
    setProductName("");
    setAvailability("Available");
    setSource("");
    setDailyPrice("");
    setPriceDate("");
    setShowProductModal(false);

  } catch (error) {
    console.error("Error updating vegetable:", error);
    alert(error.message);
  }

  return;
}

    const newProduct = {
      id:
        products.length > 0
          ? Math.max(
              ...products.map((product) => product.id)
            ) + 1
          : 1,
      name: productName,
      availability: availability,
      source: source,
    };

    setProducts([...products, newProduct]);

    setProductName("");
    setAvailability("Available");
    setSource("");
    setDailyPrice("");
    setPriceDate("");
    setShowProductModal(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setProductName(product.name);
    setAvailability(product.availability);
    setSource(product.source);

    if (category === "vegetables") {
      const price = vegetablePrices.find(
        (item) =>
          item.vegetable_name
            .trim()
            .toLowerCase() ===
          product.name.trim().toLowerCase()
      );

      if (price) {
        setDailyPrice(price.daily_price);
        setPriceDate(
          price.price_date.substring(0, 10)
        );
      } else {
        setDailyPrice("");
        setPriceDate("");
      }
    }

    setShowProductModal(true);
  };

  const handleDeleteProduct = (id) => {
    const productToDelete = products.find(
      (product) => product.id === id
    );

    if (!productToDelete) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${productToDelete.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);

    setProductName("");
    setAvailability("Available");
    setSource("");
    setDailyPrice("");
    setPriceDate("");
  };

  const handleBack = () => {
    navigate("/admin/product-categories");
  };

  const openAddModal = () => {
    setEditingProduct(null);

    setProductName("");
    setAvailability("Available");
    setSource("");
    setDailyPrice("");
    setPriceDate("");

    setShowProductModal(true);
  };

  return (
    <div className="admin-products-page">

      <div className="products-page-header">

        <div className="products-title-section">

          <button
            className="back-button"
            onClick={handleBack}
            title="Back to Product Categories"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1>{categoryName} Management</h1>

            <p>
              Manage {categoryName.toLowerCase()} available
              in the market.
            </p>
          </div>

        </div>

        <button
          className="add-product-button"
          onClick={openAddModal}
        >
          <FaPlus />
          Add {productLabel}
        </button>

      </div>


      <div className="product-summary">

        <div className="product-summary-card">

          <div className="product-summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Total {categoryName}</span>

            <strong>
              {products.length}
            </strong>
          </div>

        </div>


        <div className="product-summary-card">

          <div className="product-summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Available</span>

            <strong>
              {
                products.filter(
                  (product) =>
                    product.availability === "Available"
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="product-summary-card">

          <div className="product-summary-icon unavailable">
            <FaTimesCircle />
          </div>

          <div>
            <span>Unavailable</span>

            <strong>
              {
                products.filter(
                  (product) =>
                    product.availability === "Unavailable"
                ).length
              }
            </strong>
          </div>

        </div>

      </div>


      <div className="products-management-card">

        <div className="products-card-header">

          <div>
            <h2>{categoryName}</h2>

            <p>
              View and manage products in this category.
            </p>
          </div>

          <div className="products-search">

            <FaSearch />

            <input
              type="text"
              placeholder={`Search ${productLabel.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

        </div>


        <div className="products-table-container">

          <table className="products-table">

            <thead>

              <tr>

                <th>#</th>

                <th>{productLabel}</th>

                <th>Availability</th>

                <th>Source Region</th>

                {category === "vegetables" && (
                  <>
                    <th>Daily Price</th>
                    <th>Price Date</th>
                  </>
                )}

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {filteredProducts.map((product) => {

                const matchingPrice =
                  category === "vegetables"
                    ? vegetablePrices.find(
                        (item) =>
                          item.vegetable_name
                            .trim()
                            .toLowerCase() ===
                          product.name
                            .trim()
                            .toLowerCase()
                      )
                    : null;

                return (
                  <tr key={product.id}>

                    <td>
                      {product.id}
                    </td>

                    <td>
                      <strong className="product-name">
                        {product.name}
                      </strong>
                    </td>

                    <td>

                      {product.availability === "Available" ? (

                        <span className="available-badge">
                          <FaCheckCircle />
                          Available
                        </span>

                      ) : (

                        <span className="unavailable-badge">
                          <FaTimesCircle />
                          Unavailable
                        </span>

                      )}

                    </td>

                    <td>
                      {product.source}
                    </td>

                    {category === "vegetables" && (
                      <>
                        <td>
                          {matchingPrice
                            ? `Rs. ${matchingPrice.daily_price}`
                            : "-"}
                        </td>

                        <td>
                          {matchingPrice
                            ? matchingPrice.price_date
                                
                                
                              
                            : "-"}
                        </td>
                      </>
                    )}

                    <td>

                      <div className="product-action-buttons">

                        <button
                          className="product-edit-button"
                          title={`Edit ${productLabel}`}
                          onClick={() =>
                            handleEditProduct(product)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="product-delete-button"
                          title={`Delete ${productLabel}`}
                          onClick={() =>
                            handleDeleteProduct(product.id)
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}


              {filteredProducts.length === 0 && (

                <tr>

                  <td
                    colSpan={
                      category === "vegetables"
                        ? 7
                        : 5
                    }
                    className="no-products"
                  >
                    No {categoryName.toLowerCase()} found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {showProductModal && (

        <div className="product-modal-overlay">

          <div className="product-modal">

            <div className="product-modal-header">

              <div>

                <h2>
                  {editingProduct
                    ? `Edit ${productLabel}`
                    : `Add New ${productLabel}`}
                </h2>

                <p>
                  {editingProduct
                    ? `Update the ${productLabel.toLowerCase()} information.`
                    : `Add a new ${productLabel.toLowerCase()} to the category.`}
                </p>

              </div>

              <button
                className="product-modal-close"
                onClick={closeProductModal}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleAddProduct}>

              <div className="product-form-group">

                <label>
                  {productLabel} Name
                </label>

                <input
                  type="text"
                  placeholder={`Enter ${productLabel.toLowerCase()} name`}
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                />

              </div>


              <div className="product-form-group">

                <label>
                  Availability
                </label>

                <select
                  value={availability}
                  onChange={(e) =>
                    setAvailability(e.target.value)
                  }
                >

                  <option value="Available">
                    Available
                  </option>

                  <option value="Unavailable">
                    Unavailable
                  </option>

                </select>

              </div>


              <div className="product-form-group">

                <label>
                  Source Region
                </label>

                <input
                  type="text"
                  placeholder="e.g. Nuwara Eliya"
                  value={source}
                  onChange={(e) =>
                    setSource(e.target.value)
                  }
                />

              </div>


              {category === "vegetables" && (
                <>

                  <div className="product-form-group">

                    <label>
                      Daily Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 165"
                      value={dailyPrice}
                      onChange={(e) =>
                        setDailyPrice(e.target.value)
                      }
                    />

                  </div>


                  <div className="product-form-group">

                    <label>
                      Price Date
                    </label>

                    <input
                      type="date"
                      value={priceDate}
                      onChange={(e) =>
                        setPriceDate(e.target.value)
                      }
                    />

                  </div>

                </>
              )}


              <div className="product-modal-actions">

                <button
                  type="button"
                  className="product-cancel-button"
                  onClick={closeProductModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="product-save-button"
                >
                  {editingProduct
                    ? `Update ${productLabel}`
                    : `Add ${productLabel}`}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProducts;