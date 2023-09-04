"use strict";

require("dotenv").config();
/**
 * @port is port to run server. If it doesn't exist then use the default port
 * @apiKey is mykey to call api
 * @data is object data responsed by server
 */
const port = process.env.PORT || 5000;
let projectData = {};
/**
 * Define some library that will be used
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

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

app.use(express.static(path.join(__dirname, "website")));
/**
 * Get method
 */
app.get("/data", (req, res) => {
  try {
    console.log("GET", projectData);
    res.status(200).send(projectData);
  } catch (error) {
    next(error);
  }
});

/**
 * Post method
 */
app.post("/data", sendData);

function sendData(req, res, next) {
  try {
    projectData = {
      name: req.body.name,
      date: req.body.date,
      temp: req.body.temp,
      content: req.body.content,
    };
    console.log("POST", projectData);
    res.status(200).send({
      data: projectData,
      message: "Send Data Successfully!",
      succes: true,
    });
  } catch (error) {
    next(error);
  }
}
