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

    db.query(
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
    db.query(
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
    db.query(
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
    db.query(
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
    db.query(
      `SELECT id_no FROM userDetails WHERE userId = ?`,
      userId,
      (err, result) => {
        if (result.length > 0) {
          db.query(
            `UPDATE transactions SET id_no = ? WHERE userId = ?`,
            [result[0].id_no, userId],
            (err, result) => {
              if (err) {
                console.error("id_no in Trasactions not updated", err);
              } else {
                console.log("Id updated");
                res.status(201).send("Id updated successfully", result);
              }
            }
          );

          db.query(
            `UPDATE pensiondetails SET id_no = ? WHERE userId = ?`,
            [result[0].id_no, userId],
            (err, result) => {
              if (err) {
                console.log("Error updating userId in pensiondetails", err);
              } else {
                console.log("Updated userId in pensiondetails successfully");
                res.status(201).send("userId updated successfully", result);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/pensionProvider", (req, res) => {
  //getting id from userAccount
  const userId = req.session.user[0].id;
  const transferStatus = 0;

  try {
    db.query(
      `SELECT PensionProvider AS providerName FROM pensiondetails WHERE userId = ? AND transferStatus = ?`,
      [userId, transferStatus],
      (err, result) => {
        if (err) {
          console.error(
            "Error getting userId and transferStatus from pensiondetails"
          );
        }
        if (result.length > 0) {
          req.session.provider = result;
          res.send({ message: result });
        } else {
          res.send({ message: "Providers not found" });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/queueTransfer", (req, res) => {
  const userId = req.session.user[0].id;
  const transferStatus = req.body.transferStatus;
  const providers = req.session.provider;

  try {
    db.query(
      `UPDATE pensiondetails SET transferStatus = ? WHERE userId = ? AND transferStatus = '0'`,
      [transferStatus, userId],
      (err) => {
        if (err) {
          console.error("Error updating transferStatus in pensiondetails", err);
        }

        providers.forEach((provider) => {
          db.query(
            `UPDATE transactions SET transferStatus = ? WHERE userId = ? AND transferStatus = 0 AND pensiondProvider = ?`,
            [transferStatus, userId, provider.providerName],
            (err) => {
              if (err) {
                console.error(
                  `Error updating transaction for provider ${provider.providerName}`,
                  err
                );
              }
            }
          );
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
});

router.post("/totalCombined", (req, res) => {
  //id from userAccount table
  const userId = req.session.user[0].id;
  const transactionType = "Pension Transfer";

  try {
    db.query(
      "SELECT SUM(amount) AS totalCombined FROM transactions WHERE userId = ? AND transactionType = ?;",
      [userId, transactionType],
      (err, result) => {
        if (err) {
          console.log({ err: err });
        }
        if (result.length > 0) {
          res.send(result);
          res.status(201).send("Pensions combined successfully")
        } else {
          res.send({ message: "Amount not found" });
        }
      }
    );
  } catch (err) {
    console.error(err)
    res.status(500).send("Server error")
  }
});

module.exports = router;
