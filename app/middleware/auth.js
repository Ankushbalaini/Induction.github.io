const jwt = require("jsonwebtoken");
var router = require("express").Router();

const auth = (req, res, next) => {

  router.use(function(req, res, next) {
      var token = req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1", function(err, decoded) {
          if (err) {
            return res.send(err);
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    });
}

module.exports = auth;
