const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.post("/checkUserDetails", async (req, res) => {
  const userId = req.session[0].id;

  try {
    const details = await db.query(
      `SELECT * FROM userDetails WHERE userId = ?`,
      userId
    );

    if (details.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.status(200).send("User details found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/userDetails", async (req, res) => {
  const { phone, id_no, dob, employment_status } = req.body;

  try {
    const user = req.session.user;

    if (!user || user.length === 0) {
      res.status(400).send("User not in session");
    }

    const userId = user[0].id;

    await db.query(
      `INSERT INTO userDetails (phone, id_no, dob, employed_status, userId) VALUES(?,?,?,?,?)`,
      [phone, id_no, dob, employment_status, userId],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send("User added successfully");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
