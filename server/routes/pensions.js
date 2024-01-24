const express = require("express");
const router = express.Router();
const db = require("../db/db");

//check and update signature
router.post("/userSignature", async (req, res) => {
  try {
    const user = req.session.user;
    if (!user || user.length === 0) {
      res.status(404).send("User not in session");
    }
    const userId = user[0].id;

    await db.query(
      `SELECT * FROM pensionDetails WHERE userId = ?`,
      userId,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).send("User not found");
        }
        if (result.length > 0) {
          const userSignature = req.body.userSignature;
          db.query(
            `UPDATE pensionDetails SET userSignature = ? WHERE userId = ?`,
            [userSignature, userId],
            (err, res) => {
              if (err) {
                console.log(err);
              } else {
                res.status(201).send("Signature updated successfully");
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
});

//add pension details
router.post("/pensionDetails", async (req, res) => {
  const {
    EmployerName,
    OrganizationEmail,
    PensionProvider,
    AdditionalInformation,
    FundedByEmployer,
    transferStatus,
    transactionType,
  } = req.body;

  const name = req.session.user;
  if (!name || name.length === 0) {
    res.status(404).send("User not in session");
  }
  const userName = req.session.user[0].name;

  const user = req.session.user;
  if (!user || user.length === 0) {
    res.status(404).send("User not in session");
  }
  const userId = user[0].id;

  try {
    await db.query(
      `INSERT INTO pensiondetails (EmployerName, OrganizationEmail, PensionProvider, AdditionalInformation, FundedByEmployer, userId, transferStatus) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        EmployerName,
        OrganizationEmail,
        PensionProvider,
        AdditionalInformation,
        FundedByEmployer,
        userId,
        transferStatus,
      ]
    );
    console.log("Pension details added successfully");
    res.status(201).send("Pension details added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }

  //add user combined pension details
  try {
    await db.query(
      `INSERT INTO usercombinedpensions (userId, userName, PensionProvider, transactionType) VALUES (?, ?, ?, ?)`,
      [userId, userName, PensionProvider, transactionType]
    );
    console.log("Pensiond combined details added");
    res.status(201).send("Combined pensions added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }

  //insert into transactions
  try {
    await db.query(
      `INSERT INTO transactions (userId, PensionProvider, transactionType, transferStatus) VALUES (?, ?, ?, ?)`,
      [userId, PensionProvider, transactionType, transferStatus]
    );
    console.log("Transaction added successfully");
    res.status(201).send("Transactions added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }

  try {
    await db.query(
      `SELECT id_no FROM userDetails WHERE userId = ?`,
      userId,
      (err, result) => {
        if (result.length > 0) {
          db.query(`UPDATE transactions SET id_no = ? WHERE userId = ?`, [
            result[0].id_no,
            userId,
          ]);
          console.log("Id updated");
          res.status(201).send("Id updated successfully");

          db.query(`UPDATE pensio`)
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
