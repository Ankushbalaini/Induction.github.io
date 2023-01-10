const db = require("../models");
const Company = db.company;

// Create and Save a new company
exports.list = (req, res) => {
  Company.find({})
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

// Create and Save a new company
exports.add = (req, res) => {
  const { email, password, name, address, logo, companyID, aboutCompany } =
    req.body;

  // Validate request
  if (!email && !address && !companyID) {
    res.status(400).send({
      status: false,
      message: "Fields can not be empty!",
    });
    return;
  }

  // check if company already exist
  Company.findOne({ companyID: companyID }).then(function (result) {
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
  const company = new Company({
    email: email,
    password: password,
    name: name,
    companyID: companyID,
    address: address,
    aboutCompany: aboutCompany,
    logo: logo,
  });

  // Save Company in the database
  company
    .save(company)
    .then((data) => {
      res.send({
        status: true,
        message: "Company added successfuly",
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
