const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  var router = require("express").Router();
  var key = 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1' || process.env.JWT_KEY;
  const Student = require("../controllers/student.controller.js");

  acl.config({
    filename: "./nacl.json",
    baseUrl: "/api/"
  });

  router.use(function (req, res, next) {

    var token = req.headers["x-access-token"];
    if (token) {

      jwt.verify(token, key, function (err, decoded) {
        if (err) {
          return res.send({
            status: false,
            error: err,
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  });

  router.get("/", Student.index);
  router.get("/unassigned", Student.unassigned );
  app.use("/api/students", router);
  
};
