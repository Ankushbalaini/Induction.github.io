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
 *
 * @method : POST
 * @response JSON
 */
exports.add = (req, res) => {
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
    { user_id: user._id, email, user_type: "company" },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    {
      expiresIn: "2h",
    }
  );

  // save user token
  user.token      = token;
  user.status     = true;
  user.user_type  = 'company';
  user.save();

  data.user_id = user._id;
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
};

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
    user_type: "company",
    published: req.body.published ? req.body.published : false,
  });

  // Create token
  const token = jwt.sign(
    { user_id: user._id, email, user_type: user.user_type },
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
