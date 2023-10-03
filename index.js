const express = require("express");
const app = express();
const port = 3000;

const routenama_dpi = require("./controller/dpi.js");
const routeid_pemilik = require("./controller/pemilik.js");
const routeid_alat_tangkap = require("./controller/alat_tangkap.js");
const routeid_kapal = require("./controller/kapal.js");

const bodyPs = require("body-parser");
app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());

app.use("/api/dpi", routenama_dpi);
app.use("/api/pemilik", routeid_pemilik);
app.use("/api/alat_tangkap", routeid_alat_tangkap);
app.use("/api/kapal", routeid_kapal);

app.listen(port, () => {
  console.log(`aplikasi berjalan di http::/localhost:${port}`);
});
