const express = require("express");
const db = require("../models");
const companyModel = db.company;
const userModel = db.users;
const userCredModel = db.user_cred;
const UserInductionResults = db.user_induction_results;
const Induction = db.induction;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var jwt = require("jsonwebtoken");

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

// Create and Save a new company
exports.list = (req, res) => {
  companyModel
    .find({})
    .sort({ createdAt: -1 })
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
 * @method : POST
 * @response JSON
 */
exports.add_nk = (req, res) => {
  // console.log(req.files);
  try {
    let logo;
    let uploadPath;
    const { email, password, name, address, aboutCompany } = req.body;

    const data = {
      email,
      password,
      company: {
        name,
        aboutCompany,
        address,
      },
    };

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(500).send({
        status: false,
        message: "Logo is required!",
      });
    }

    logo = req.files.logo;
    uploadPath = "images/company/" + logo.name;

    logo.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send({
          status: false,
          message: err.message,
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
    user.token = token;
    user.status = true;
    user.role = "company";
    user
      .save()
      .then((user) => {
        res.status(200).send({
          status: true,
          message: "company added successfully!",
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: err.message,
        });
      });

    return;
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      data: req.files.logo,
    });
  }
};

exports.add = async (req, res) => {
  try {
    const { email, password, name, address, companyID, aboutCompany } =
      req.body;

    const data = {
      email,
      password,
      name,
      address,
      companyID,
      aboutCompany,
    };

    // logo validation
    if (!req.files || Object.keys(req.files).length === 0) {
      if (req.body.logo === "") {
        return res.status(500).send({
          status: false,
          message: "Company Logo is required!",
        });
      }
    } else {
      var Img = req.files.logo;
      var uploadPath = "images/profile/" + Img.name;

      Img.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message,
          });
        }
      });
      data.logo = Img.name;
    }

    // Check if email already exists
    const existingUser = await userCredModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        status: false,
        message: "Email already exists!",
      });
    }

    var user = new userCredModel(data);
    // Create token
    const token = jwt.sign(
      { userID: user._id, email: email, role: "company" },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;
    user.status = true;
    user.role = "company";

    data.userID = user._id;
    var company = new companyModel(data);
    user.company = company._id;

    user.save().catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });

    //data.userID = user._id;
    //var company = new companyModel(data);

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
        // Check if company with same companyID already exists
        if (err.code === 11000) {
          res.status(409).send({
            status: false,
            message: "Company with this Slug already exists!",
            data: {},
          });
        } else {
          res.status(400).send({
            status: false,
            message: "Some error " + err.message,
            data: {},
          });
        }
      });
    return;
  } catch (err) {
    res.status(400).send({
      status: false,
      message: "Some error " + err.message,
      data: {},
    });
  }

  return;
};

//Edit the Company
/**
 * @description: Finding company by their ID and then updating the credentials
 *
 * @param req
 * @param res
 */
exports.edit = (req, res) => {
  const id = req.params.id;
  var saveData = {
    name: req.body.name,
    email: req.body.email,
    logo: req.body.logo_previous,
    address: req.body.address,
    aboutCompany: req.body.aboutCompany,
  };

  // empty field validations
  if (
    saveData.name === "" ||
    saveData.email === "" ||
    saveData.address === "" ||
    saveData.aboutCompany === ""
  ) {
    return res.status(400).send({
      message: "Data to be edit can't be empty!",
    });
  }

  if (req.body.companyID !== "") {
    saveData.companyID = req.body.companyID;
  }

  // logo validation
  if (!req.files || Object.keys(req.files).length === 0) {
    if (req.body.logo_previous === "") {
      return res.status(500).send({
        status: false,
        message: "Company Logo is required!",
      });
    }
  } else {
    var Img = req.files.logo;
    var uploadPath = "images/company/" + Img.name;

    Img.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      }
    });
    saveData.logo = Img.name;
  }

  // Check for duplicate email
  companyModel.findOne(
    { email: saveData.email },
    function (err, existingCompany) {
      if (err) {
        return res.status(500).send({
          status: false,
          message: "Some error occurred while checking for duplicate email!",
        });
      }

      if (existingCompany && existingCompany._id.toString() !== id) {
        return res.status(400).send({
          status: false,
          message: "Email already exists!",
        });
      }

      companyModel
        .findByIdAndUpdate(id, { ...saveData }, { useFindAndModify: true })
        .then(function (user) {
          if (!user) {
            res.status(404).send({
              message: "company not found.",
              status: false,
            });
          } else {
            return res.status(200).send({
              message: "Company has been updated successfully",
              status: true,
              data: user,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            status: false,
            message: "Some Slug should be unique.",
          });
        });
    }
  );
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.update = (req, res) => {
  try {
    const id = req.params.id;
    // 63cea890edb762dfb4abb21f
    // 63cea890edb762dfb4abb220

    var saveData = {
      name: req.body.name,
      email: req.body.email,
      logo: req.body.logo,
      address: req.body.address,
      aboutCompany: req.body.aboutCompany,
    };

    // empty field validations
    if (
      saveData.name === "" ||
      saveData.email === "" ||
      saveData.address === "" ||
      saveData.aboutCompany === ""
    ) {
      return res.status(400).send({
        message: "Data to be edit can't be empty!",
      });
    }

    // logo validation
    if (!req.files || Object.keys(req.files).length === 0) {
      if (req.body.logo === "") {
        return res.status(500).send({
          status: false,
          message: "Company Logo is required!",
        });
      }
    } else {
      var Img = req.files.image;
      var uploadPath = "images/company/" + Img.name;

      Img.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message,
          });
        }
      });
      saveData.logo = Img.name;
    }

    companyModel
      .findByIdAndUpdate(id, { ...saveData }, { useFindAndModify: true })
      .then(function (user) {
        if (!user) {
          res.status(404).send({
            message: "company not found.",
            status: false,
          });
        } else {
          return res.status(200).send({
            message: "Company has been updated successfully",
            status: true,
            data: user,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          message:
            err.message || "Some error occurred while creating the Deparment.",
        });
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      data: req.body,
    });
  }
};


exports.companyDropdownList = (req, res) => {
  userCredModel
  .find({ role: USER_ROLES.COMPANY, status:1 }, { _id: 1, email:1,status:1, createdAt: 1 })
  .populate("company", {_id :1 , name:1, companyID:1, logo:1, address:1, aboutCompany:1 })
  .sort({ createdAt: -1 })
  .then((user) => {
    return res.status(200).send({
      status: true,
      message: "Company listing",
      data: user,
    });
  })
  .catch((err) => {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  });
}




/**
 * 
 * fetch last 10 records of user attempted inductions filter by company ID
 * 
 */
exports.dashboard = async (req, res) => {
  try{
    const userData = req.decoded;
    var inductionIDs = [];
    const inductions = await Induction.find({ parentCompany: userData.userID }, { _id:1, title: 1});

    if(inductions.length > 0) {
      inductions.forEach(function(item){
        inductionIDs.push(ObjectId(item._id));
      });
    }else{
      return res.status(201).send({
        status: true,
        message: "Company do not have any Induction in system!",
        data: []
      })
    }
    
    UserInductionResults.find({ inductionID: { $in: inductionIDs } })
    .sort({ createdAt: -1})
    .limit(10)
    .then((results)=>{
      return res.status(201).send({
        status: true,
        message: "Last 10 Results of Company Inductions!",
        data: {
            total: results.length,
            rows: results
        },
        inductions: inductionIDs
      })
    }).catch((err)=>{
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    });

  }catch(error){
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
}