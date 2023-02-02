const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  var router = require("express").Router();
  const Student = require("../controllers/student.controller.js");

  router.get("/", Student.index);
  

  
  app.use("/api/students", router);
};
