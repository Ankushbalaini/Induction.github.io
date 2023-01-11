const db = require("../models");
const InstructorTable = db.instructor;
const userCredTable = db.user_cred;

var jwt = require("jsonwebtoken");
const { instructor } = require("../models");

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

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.add = (req, res) => {
    try{
        const { email, user_type } = req.body;

        var InstructorCred = new userCredTable(req.body);

        // Create token
        const token = jwt.sign(
            { user_id: InstructorCred._id, email, user_type },
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            {
            expiresIn: "2h",
            }
        );

        // save user token
        InstructorCred.token = token;
        InstructorCred.save();

        req.body.user_id = InstructorCred._id;
        var instructorData = new InstructorTable(req.body);

        instructorData
            .save()
            .then((response) => {
            res.status(200).send({
                status: true,
                message: "Success",
                data: response,
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

    }catch(e){
        return res.status(400).send({
            status: false,
            message: "Some error " + e.message,
            data: {},
        });
    }

  
};
