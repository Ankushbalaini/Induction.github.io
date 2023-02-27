/*
module.exports = (app) => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Add a new company
  router.post("/add", company.add);

  // list all companies
  router.get("/companyDropdownList", company.companyDropdownList);

  router.get("/list", company.list);

  router.get("/dashboard", company.dashboard);

   //update company values
   router.put('/edit/:id',company.edit);

  // need token for this request
  router.put('/update',company.update);


  
  // soft delete company

  app.use("/api/company", router);
};
*/


const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  var router = require("express").Router();
  var key = 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1' || process.env.JWT_KEY;
  const company = require("../controllers/company.controller.js");

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

  // Add a new company
  router.post("/add", company.add);

  // list all companies
  router.get("/companyDropdownList", company.companyDropdownList);

  router.get("/list", company.list);

  router.get("/dashboard", company.dashboard);

   //update company values
   router.put('/edit/:id',company.edit);

  // need token for this request
  router.put('/update',company.update);



  app.use("/api/company", router);
  
};
