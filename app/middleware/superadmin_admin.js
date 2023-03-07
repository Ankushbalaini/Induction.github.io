const jwt = require("jsonwebtoken");

const verifyAdminAndSuperAdminToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    req.user = decoded;

    if(req.user.user_type == 'user'){
        throw new exception("Only Superadmin and Admin can access this route.");
    }
  } catch (err) {
    return res.status(401).send({message: err.message });
  }
  return next();
};

module.exports = verifyAdminAndSuperAdminToken;
