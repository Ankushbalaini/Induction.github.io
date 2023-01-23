const express = require("express");
const db = require("../models");
const companyModel = db.company;
const userModel = db.users;
const userCredModel = db.user_cred;
// const fileupload = require('express-fileupload');
// const app = express();
// app.use(fileupload());

var jwt = require("jsonwebtoken");

// Create and Save a new company
exports.list = (req, res) => {
  companyModel
    .find({})
    .then(function (result) {
      if (result) {
        res.status(200).send({
          status: true,
          message: "Comapny listing",
          data: result,
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

/*
 * @author Singh
 *
 * @method : POST
 * @response JSON
 */
exports.add = (req, res) => {
  // console.log(req.files);
  try{
    let logo;
    let uploadPath;
    const {email, password, name, address, aboutCompany} = req.body;

    const data = {
      email,
      password,
      company:{
        name, aboutCompany, address
      }
    };

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(500).send({
        status: false,
        message: "Logo is required!"
      });
    }

    logo = req.files.logo;    
    uploadPath = 'images/' + logo.name;

    logo.mv(uploadPath, function(err) {
      if (err){
        return res.status(500).send({
          status: false,
          message: err.message
        });
      }

      data.company.logo = logo.name;
    });

    var user = new userCredModel(data);
    // Create token
    const token = jwt.sign(
      { _id: user._id, email: email, role: "company" },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token      = token;
    user.status     = true;
    user.role  = 'company';
    user.save()
    .then((user)=>{
      res.status(200).send({
        status: true,
        message: "company added successfully!",
        data: user
      });
    })
    .catch((err)=>{
      res.status(400).send({
        status: false,
        message: err.message
      });
    });
    

return;
    

  }catch(err){

    return res.status(500).send({
      status: false,
      message: err.message,
      data: req.files.logo
    });

  }
    
}






exports.add_org = (req, res) => {
  try{
    const { email, password, name, address, logo, companyID, aboutCompany } =
    req.body;

    const data = {
      email,
      password,
      name,
      address,
      logo,
      companyID,
      aboutCompany,
    };


    var user = new userCredModel(data);
    // Create token
    const token = jwt.sign(
      { _id: user._id, email: email, role: "company" },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token      = token;
    user.status     = true;
    user.role  = 'company';
    user.save()
    .catch((err)=>{
      res.status(400).send({
        status: false,
        message: err.message
      });
    });

    data.userID = user._id;
    var company = new companyModel(data);

    company
      .save()
      .then((data) => {
        res.status(200).send({
          status: true,
          message: "Success",
          data: data,
        });
      })
      .catch((err) => {
       
        res.status(400).send({
          status: false,
          message: "Some error " + err.message,
          data: {},
        });

      });
      return;
      
  }catch(err){
    res.status(400).send({
      status: false,
      message: "Some error " + err.message,
      data: {},
    });
  }
  
  return;
};







/*
exports.add_company = (req, res) => {
  const { email, password, name, address, logo, companyID, aboutCompany } =
    req.body;

  // Validate request
  if (!email && !password && !companyID) {
    res.status(400).send({
      status: false,
      message: "Fields can not be empty!",
    });
    return;
  }

  // check if company already exist
  companyModel.findOne({ companyID: companyID }).then(function (result) {
    if (result) {
      res.status(200).send({
        status: false,
        message: "Company already registered.",
        data: result,
      });
      return;
    }
  });

  // Create a User
  const user = new userModel({
    first_name: "",
    last_name: "",
    email: email,
    password: password,
    role: "company",
    published: req.body.published ? req.body.published : false,
  });

  // Create token
  const token = jwt.sign(
    { userID: user._id, email, role: user.role },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    {
      expiresIn: "2h",
    }
  );
  // save user token
  user.token = token;

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send({
        status: true,
        message: "Company Added successful2",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
*/
