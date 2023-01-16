const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  var router = require("express").Router();
  var key = process.env.JWT_KEY;
  const users = require("../controllers/user.controller.js");

  acl.config({
    filename: "./nacl.json",
    baseUrl: "/api/"
  });

  
  router.post("/login", users.login);
  router.post("/reset-password", users.resetPassword);
  router.post("/create-password", users.createPassword);

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
  

  router.use(
    acl.authorize.unless({
      path: ["/login"],
    })
  );

  router.get("/", users.findAll);
  router.get("/profile", users.profile);
  router.get("/published", users.findAllPublished);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  router.delete("/", users.deleteAll);
  
  
  app.use("/api/users", router);
};
