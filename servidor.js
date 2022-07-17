const express = require("express");
const fs = require("fs");
const app = express();
const axios = require("axios");

var https = require("https");

const body = require("body-parser");

app.use(body.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

var server = app.listen(8080, () => {
  console.log("Servidor web iniciado en el puerto 8080, http://localhost:8080");
});

app.post("/roommates", async (req, res, next) => {
  res.send();
  try {
    await axios
      .get("https://randomuser.me/api", {
        headers: { "Content-Type": "application/json" },
      })

      .then((res) => {
        fs.writeFileSync(
          __dirname + "/public/json/roommates.json",
          JSON.stringify(res.data),
          "utf8",
          (err) => {
            if (err) console.log("El json se escribio de manera correcta", err);
          }
        );
      });
  } catch (err) {
    console.error("El json no llego", err);
  }
});

app.post("/gastos", async (req, res, next) => {
  res.send();

  try {
    await axios
      .get("../public/script.js", {
        headers: { "Content-Type": "application/json" },
      })

      .then((res) => {
        var nombreForm;
        var descripcionForm;
        var montoForm;
      });
  } catch (err) {
    console.error("El json no llego", err);
  }

  fs.appendFile(
    __dirname + "/public/json/gasto.json",
    "JSON no llego",
    "utf8",
    () => {}
  );
});
