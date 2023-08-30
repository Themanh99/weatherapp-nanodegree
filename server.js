"use strict";

require("dotenv").config();
/**
 * @port is port to run server. If it doesn't exist then use the default port
 * @apiKey is mykey to call api
 * @data is object data responsed by server
 */
const port = process.env.PORT || 5000;
const apiKey = `${process.env.API_KEY}&units=imperial`;
const data = {};
/**
 * Define some library that will be used
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/**
 * Define app by express middleware
 */
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/**
 * Get method
 */
app.get("/data", (req, res) => {
  res.status(200).send(data);
});

/**
 * Post method
 */
app.post("/data", sendData);

function sendData(req, res, next) {
  try {
    res.status(200).send({
      data: data,
      message: "Successfully!",
    });
  } catch (error) {
    next(error);
  }
}
