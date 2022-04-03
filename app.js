const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/routes");
const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

//CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.DB_URL, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${process.env.DB_URL}`);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`SERVER RUNNING ON PORT: ${process.env.PORT}`)
);
