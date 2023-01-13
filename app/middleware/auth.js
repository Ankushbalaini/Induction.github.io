const jwt = require("jsonwebtoken");
var ROUTER = require("express").Router();

const verifyToken = (req, res, next) => {

  ROUTER.use(function(req, res, next) {
      var token = req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, key, function(err, decoded) {
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

module.exports = verifyToken;
