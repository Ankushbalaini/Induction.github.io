const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  const induction = require("../controllers/induction.controller.js");
  var router = require("express").Router();
  var key = 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1' || process.env.JWT_KEY;
  const users = require("../controllers/user.controller.js");

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
  

  router.get("/", induction.index);

  // Create a new Induction
  router.post("/store", induction.store);

  // router.post("/add", induction.add);

  // Retrieve a single User with id
  router.get("/:id", induction.findOne ); 

  router.get("/_new/:id", induction.findOne_new ); 

  router.post("/updatePassingMarks", induction.updatePassingMarks);
  router.get("/filter/by/company", induction.filterByCompany);
  
  

  app.use('/api/induction', router);
};

