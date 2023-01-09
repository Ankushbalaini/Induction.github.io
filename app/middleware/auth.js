const jwt = require("jsonwebtoken");

const roles = ['superadmin', 'admin', 'user'];

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

    if(req.user.user_type == 'superadmin'){
       // allow all request - superadmin
      
    } else if(req.user.user_type == 'admin'){
      // allow only own / group user request 

      // admin 
      // can view
      // can change status
      // can update 
      // not able to delete

      // request.type
      //  

    }
    else{
      // allow own requests only
    }

  } catch (err) {
    return res.status(401).send({message: err.message });
  }
  return next();
};

module.exports = verifyToken;
