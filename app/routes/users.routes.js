const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  var router = require("express").Router();
  var key = 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1' || process.env.JWT_KEY;
  const users = require("../controllers/user.controller.js");

  router.post("/create-password", users.createPassword); // create password

  acl.config({
    filename: "./nacl.json",
    baseUrl: "/api/"
  });

  router.post("/",  users.signUp);  // sign up


  // router.post("/",  users.create);  // sign up
  router.post("/login", users.login); // login
  router.post("/reset-password", users.resetPassword); // reset password
 

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
  

  // router.use(
  //   acl.authorize.unless({
  //     path: ["/login"],
  //   })
  // );

  router.get("/", users.findAll);
  router.get("/profile", users.profile);
  router.get("/getProfile", users.getProfile);
  router.get("/inductions", users.inductions);
  
  router.get("/published", users.findAllPublished);
  router.get("/:id", users.findOne);
  router.put("/update", users.update);

  router.put("/edit/:id", users.edit);
  
  router.delete("/:id", users.delete);
  router.delete("/", users.deleteAll);
  
  
  router.put("/setting", users.setting);

  
  app.use("/api/users", router);
};
