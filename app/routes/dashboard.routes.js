const routes = require("./routes.js");

module.exports = function (app) {
  require("dotenv").config();
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");

  var router = require("express").Router();
  var key = process.env.JWT_KEY;

  const dashboard = require("../controllers/dashboard.controller.js");

  acl.config({
    filename: "./nacl.json",
    baseUrl: "/api/dashboard",
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

  router.get("/", dashboard.index);
  router.get("/company", dashboard.company);
  router.get("/instructor", dashboard.instructor);

  


  app.use("/api/dashboard", router);
};
