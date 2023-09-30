const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query(
    "SELECT k.nama_kapal, d.luas, p.nama_pemilik, a.nama_alat_tangkap FROM kapal as k INNER JOIN dpi as d ON k.id_dpi = d.id_dpi INNER JOIN pemilik as p ON k.id_pemilik = p.id_pemilik INNER JOIN alat_tangkap as a ON k.id_alat_tangkap = a.id_alat_tangkap",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kapal",
          payload: rows,
        });
      }
    }
  );
});

router.post(
  "/",
  [
    body("nama_kapal").notEmpty(),
    body("id_pemilik").notEmpty(),
    body("id_dpi").notEmpty(),
    body("id_alat_tangkap").notEmpty(),
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
      nama_kapal: req.body.nama_kapal,
      id_pemilik: req.body.id_pemilik,
      id_dpi: req.body.id_dpi,
      id_alat_tangkap: req.body.id_alat_tangkap,
    };
    connect.query("INSERT INTO kapal set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data alat tangkap berhasil ditambahkan",
          payload: data,
        });
      }
    });
  }
);

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "SELECT k.nama_kapal, d.luas, p.nama_pemilik, a.nama_alat_tangkap FROM kapal as k INNER JOIN dpi as d ON k.id_dpi = d.id_dpi INNER JOIN pemilik as p ON k.id_pemilik = p.id_pemilik INNER JOIN alat_tangkap as a ON k.id_alat_tangkap = a.id_alat_tangkap WHERE id_kapal=?",
    id,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kapal",
          payload: rows,
        });
      }
    }
  );
});

router.patch(
  "/(:id)",
  [
    body("nama_kapal").notEmpty(),
    body("id_pemilik").notEmpty(),
    body("id_dpi").notEmpty(),
    body("id_alat_tangkap").notEmpty(),
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
      nama_kapal: req.body.nama_kapal,
      id_pemilik: req.body.id_pemilik,
      id_dpi: req.body.id_dpi,
      id_alat_tangkap: req.body.id_alat_tangkap,
    };
    connect.query(
      "UPDATE kapal set ? WHERE id_kapal=?",
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
            message: "Data kapal berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);

router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "DELETE FROM kapal WHERE id_alat_tangkap=?",
    id,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kapal berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;
