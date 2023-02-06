const routes = require("./routes.js");

module.exports = function (app) {
  
  const acl = require("express-acl");
  const jwt = require("jsonwebtoken");
  
  require("dotenv").config();
  
  const department = require("../controllers/department.controller")

  var router = require("express").Router();
  var key = 'eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1' || process.env.JWT_KEY;
  

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
  

  //Create New deparment
  router.post('/add',department.create);
    
  // Edit Department
  router.put('/edit/:id',department.edit);

  //List all Department
  router.get('/getall',department.getAll);

  // get only active dept for dropdown
  router.get('/getAllActive',department.getAllActive);

  router.post('/getDepartmentByComp',department.getDepartmentByComp);

  // Delete Department
  router.delete('/delete/:id',department.delete);
  
  // Get department 
  router.get('/get/:id',department.getDepartment);

  app.use('/api/department', router);

};


