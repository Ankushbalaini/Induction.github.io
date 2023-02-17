const express = require("express");
const db = require("../models");
const companyModel = db.company;
const userModel = db.users;
const userCredModel = db.user_cred;

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

exports.add = (req, res) => {
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
      var uploadPath = "images/company/" + Img.name;

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
    user.save().catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
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

  if(req.body.companyID !=='' ){
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
