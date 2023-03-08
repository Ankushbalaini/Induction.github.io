module.exports = function (app) {
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  require("dotenv").config();
  var ROUTER = require("express").Router();

  var key = process.env.JWT_KEY;


  acl.config({
    filename: "nacl.json",
    baseUrl: "api/users",
  });

  
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

  ROUTER.use(
    acl.authorize.unless({
      path: ["/api/users/login"],
    })
  );



  require("./users.routes")(app);
  
  app.use("/api/users", ROUTER);

  //

};
