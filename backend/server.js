const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {
  res.send("DDEC Backend is running!");
});


// Test route
app.get("/test", (req, res) => {
  res.send("API route is working!");
});


// Get all vegetable prices
app.get("/api/vegetable-prices", (req, res) => {

  const sql = "SELECT * FROM vegetable_prices";

  db.query(sql, (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(results);
  });

});


// Get latest vegetable price date
app.get("/api/vegetable-price-date", (req, res) => {

  const sql = `
    SELECT MAX(price_date) AS latest_date
    FROM vegetable_prices
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(results[0]);

  });

});


// Update vegetable price and date
app.put("/api/vegetable-prices/:id", (req, res) => {

  const { id } = req.params;
  const { daily_price, price_date } = req.body;

  const sql = `
    UPDATE vegetable_prices
    SET daily_price = ?, price_date = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [daily_price, price_date, id],
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Database update error"
        });
      }

      res.json({
        message: "Vegetable price updated successfully"
      });

    }
  );

});

// =====================================================
// GET MARKET INFORMATION
// =====================================================

app.get("/api/market-information", (req, res) => {

  const sql = `
    SELECT *
    FROM market_information
    WHERE id = 1
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.error("Error fetching market information:", err);

      return res.status(500).json({
        message: "Failed to fetch market information"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Market information not found"
      });
    }

    res.json(result[0]);

  });

});

// =====================================================
// GET ALL ANNOUNCEMENTS
// =====================================================

app.get("/api/announcements", (req, res) => {

  const sql = `
    SELECT *
    FROM announcements
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error("Error fetching announcements:", err);

      return res.status(500).json({
        message: "Failed to fetch announcements"
      });
    }

    res.json(results);

  });

});

// =====================================================
// ADD ANNOUNCEMENT
// =====================================================

app.post("/api/announcements", (req, res) => {

  const { text, date } = req.body;

  if (!text || !text.trim()) {

    return res.status(400).json({
      message: "Announcement text is required"
    });

  }

  const sql = `
    INSERT INTO announcements (text, date)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [text, date || "Today"],
    (err, result) => {

      if (err) {

        console.error(
          "Error adding announcement:",
          err
        );

        return res.status(500).json({
          message: "Failed to add announcement"
        });

      }

      res.status(201).json({
        id: result.insertId,
        text: text,
        date: date || "Today"
      });

    }
  );

});

// =====================================================
// DELETE ANNOUNCEMENT
// =====================================================

app.delete("/api/announcements/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM announcements
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.error(
        "Error deleting announcement:",
        err
      );

      return res.status(500).json({
        message: "Failed to delete announcement"
      });

    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Announcement not found"
      });

    }

    res.json({
      message: "Announcement deleted successfully"
    });

  });

});

// =====================================================
// GET ALL MARKET HIGHLIGHTS
// =====================================================

app.get("/api/market-highlights", (req, res) => {

  const sql = `
    SELECT *
    FROM market_highlights
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {

      console.error(
        "Error fetching market highlights:",
        err
      );

      return res.status(500).json({
        message: "Failed to fetch market highlights"
      });

    }

    res.json(results);

  });

});

// =====================================================
// ADD MARKET HIGHLIGHT
// =====================================================

app.post("/api/market-highlights", (req, res) => {

  const { title, description } = req.body;

  if (!title || !title.trim()) {

    return res.status(400).json({
      message: "Highlight title is required"
    });

  }

  if (!description || !description.trim()) {

    return res.status(400).json({
      message: "Highlight description is required"
    });

  }

  const sql = `
    INSERT INTO market_highlights (title, description)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [title, description],
    (err, result) => {

      if (err) {

        console.error(
          "Error adding market highlight:",
          err
        );

        return res.status(500).json({
          message: "Failed to add market highlight"
        });

      }

      res.status(201).json({
        id: result.insertId,
        title: title,
        description: description
      });

    }
  );

});

// =====================================================
// DELETE MARKET HIGHLIGHT
// =====================================================

app.delete("/api/market-highlights/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM market_highlights
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.error(
        "Error deleting market highlight:",
        err
      );

      return res.status(500).json({
        message: "Failed to delete market highlight"
      });

    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Market highlight not found"
      });

    }

    res.json({
      message: "Market highlight deleted successfully"
    });

  });

});

// =====================================================
// UPDATE MARKET INFORMATION
// =====================================================

app.put("/api/market-information/1", (req, res) => {

  const {
    categories,
    sections,
    operating_hours,
    active_users,
    operating_days,
    market_hours,
    about_ddec,
    phone,
    email,
    location
  } = req.body;

  const sql = `
    UPDATE market_information
    SET
      categories = ?,
      sections = ?,
      operating_hours = ?,
      active_users = ?,
      operating_days = ?,
      market_hours = ?,
      about_ddec = ?,
      phone = ?,
      email = ?,
      location = ?
    WHERE id = 1
  `;

  const values = [
    categories,
    sections,
    operating_hours,
    active_users,
    operating_days,
    market_hours,
    about_ddec,
    phone,
    email,
    location
  ];

  db.query(sql, values, (err, result) => {

    if (err) {
      console.error("Error updating market information:", err);

      return res.status(500).json({
        message: "Failed to update market information"
      });
    }

    res.json({
      message: "Market information updated successfully"
    });

  });

});

// ========================================
// ADMIN LOGIN
// ========================================

app.post("/api/admin/login", (req, res) => {

  const { username, password } = req.body;

  // Check whether username and password were provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  const sql = `
    SELECT *
    FROM admin_users
    WHERE username = ? AND password = ?
  `;

  db.query(
    sql,
    [username, password],
    (err, results) => {

      if (err) {
        console.error(
          "Error during admin login:",
          err
        );

        return res.status(500).json({
          message: "Login failed"
        });
      }

      // No matching admin
      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid username or password"
        });
      }

      // Login successful
      res.json({
        message: "Login successful",
        admin: {
          id: results[0].id,
          username: results[0].username
        }
      });

    }
  );
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});