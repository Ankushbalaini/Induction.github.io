const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  var router = require("express").Router();
  var key = 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1' || process.env.JWT_KEY;
  
  const instructor = require("../controllers/instructor.controller.js");


  acl.config({
    filename: "./nacl.json",
    baseUrl: "/api/"
  });

  // list all instructors

  router.get("/list", instructor.list);
  
  router.get("/listByCompany", instructor.listByCompany);

  router.get("/filterByCompany", instructor.filterByCompany);
  
  router.put("/edit/:id", instructor.edit );
 

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
  
  router.get("/", instructor.index);
  // router.use(
  //   acl.authorize.unless({
  //     path: ["/login"],
  //   })
  // );

  // Add a new instructor
  router.post("/add", instructor.add);
  
  app.use("/api/instructor", router);
};


