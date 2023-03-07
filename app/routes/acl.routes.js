module.exports = function (app) {
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  require("dotenv").config();

  acl.config({
    filename: "nacl.json",
    baseUrl: "v1",
  });

  var ROUTER = require("express").Router();

  var key = process.env.JWT_KEY;
  /**
   * lets create our jwt middleware
   */

  ROUTER.use(function (req, res, next) {
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

  /**
   * our acl middleware will go here
   */

  ROUTER.use(
    acl.authorize.unless({
      path: ["/v1/blogs"],
    })
  );

  /**
   * Other routes we are protecting
   */

  ROUTER.route("/admin")
    .post(function (req, res) {
      res.send({
        message: "Access granted",
      });
    })
    .get(function (req, res) {
      res.send({
        message: "Access granted",
      });
    })
    .put(function (req, res) {
      res.send({
        message: "Access granted",
      });
    })
    .delete(function (req, res) {
      res.send({
        message: "Access granted",
      });
    });

  ROUTER.route("/blogs")
    .post(function (req, res) {
      res.send({
        message: "Access granted",
      });
    })
    .get(function (req, res) {
      res.send({
        message: "Access granted",
      });
    })
    .put(function (req, res) {
      res.send({
        message: "Access granted",
      });
    })
    .delete(function (req, res) {
      res.send({
        message: "Access granted",
      });
    });
  /**
   * Now lets include our router to the main app
   */

  app.use("/v1", ROUTER);
};
