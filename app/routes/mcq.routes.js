const routes = require("./routes.js");

module.exports = function (app) {
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");

  require("dotenv").config();
  var router = require("express").Router();
  var key =
    "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1" || process.env.JWT_KEY;

  const mcq = require("../controllers/mcq.controller.js");

  router.post("/add", mcq.add);
  router.get("/:id", mcq.index);

  router.post("/start/:inductionID", mcq.startTest);
  router.put("/edit/:id", mcq.edit);

  acl.config({
    filename: "./nacl.json",
    baseUrl: "/api/",
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

  router.put("/:id", mcq.edit);
  router.post("/submit/:testID", mcq.submitTest);
  app.use("/api/mcq", router);
};
