const jwt = require("jsonwebtoken");

// base on department , need to assign atleast 1 one admin
// admin can create,edit respected dept user.



const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({message: "Invalid Token " });
  }
  return next();
};

module.exports = verifyToken;
