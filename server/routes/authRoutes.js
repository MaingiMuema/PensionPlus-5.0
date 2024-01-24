const express = require("express");
const router = express.Router();
const db = require("../db/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/create", async (req, res) => {
  //Create account details
  const { name, email, password, refValue } = req.body;
  const bonusCheck = 0;

  try {
    // check if user already exists
    const user = await db.query(`SELECT * FROM userAccount WHERE email = ?`, [
      email,
    ]);
    if (user.length > 0) {
      res.status(400).send("A user with that email aleady exists");
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Insert into database
    await db.query(
      `INSERT INTO userAccount (name, email, password, refValue, bonusCheck) VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, refValue, bonusCheck]
    );
    console.log("User added successfully!");
    res.status(201).send("User created successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  //login details
  const { email, password } = req.body;

  //check if user exists
  await db.query(
    "SELECT * FROM userAccount WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        console.log({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            res.status(200).send("Successfully logged in");
          } else {
            res.status(401).send("Wrong credentials");
          }
        });
      } else {
        res.send({ message: "User does not exist!" });
      }
    }
  );
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).send({ message: "Log out error!" });
      } else {
        res.status(200).send({ message: "Logged out" });
        res.redirect("/login");
      }
    });
  } else {
    res.status(401).send("Not logged in");
  }
});

module.exports = router;
