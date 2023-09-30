const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM pemilik", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data pemilik",
        payload: rows,
      });
    }
  });
});

router.post(
  "/",
  [
    body("nama_pemilik").notEmpty(),
    body("alamat").notEmpty(),
    body("no_hp").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let data = {
      nama_pemilik: req.body.nama_pemilik,
        alamat: req.body.alamat,
        no_hp: req.body.no_hp,
      
    };
    connect.query("INSERT INTO pemilik set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data pemilik berhasil ditambahkan",
          payload: data,
        });
      }
    });
  }
);

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM pemilik WHERE id_pemilik=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data pemilik",
        payload: rows,
      });
    }
  });
});

router.patch(
  "/(:id)",
  [
    body("nama_pemilik").notEmpty(),
    body("alamat").notEmpty(),
    body("no_hp").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let id = req.params.id;
    let data = {
      nama_pemilik: req.body.nama_pemilik,
      alamat: req.body.alamat,
      no_hp: req.body.no_hp,
    };
    connect.query(
      "UPDATE pemilik set ? WHERE id_pemilik=?",
      [data, id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Data pemilik berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM pemilik WHERE id_pemilik=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data pemilik berhasil didelete",
      });
    }
  });
});

module.exports = router;
