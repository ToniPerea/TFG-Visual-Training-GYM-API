const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/routes");
const mongoose = require("mongoose");

require("dotenv").config();

app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.DB_URL, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${process.env.DB_URL}`);
  }
});
