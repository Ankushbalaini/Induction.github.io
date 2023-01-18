const db = require("../models");
const InstructorTable = db.instructor;
const userCredTable = db.user_cred;


var jwt = require("jsonwebtoken");
const { instructor } = require("../models");

// Create and Save a new company
exports.list_org = (req, res) => {
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
exports.list = (req, res) => {

  userCredTable.aggregate([
    {
      $match: { $expr: { $eq: ["$role", "instructor"] } },
    },
    {
      $lookup: {
        from: "instructors",
        localField: "_id",
        foreignField: "user_id",
        as: "profile",
      }
    },
    {
      $unwind: "$profile"
    },
    {
      $project: {
        _id: 1,
        email: 1,
        role: 1,
        profile: 1,
        company:1,
      },
    },
  ])
    .then((data) => {
      res.status(200).send({
        status: true,
        message: "All Instuctor Listing",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message,
        data: {},
      });
    });
};

















/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * instructor@gmail.com
 */
exports.add = (req, res) => {
    try{
        const { email, role } = req.body;

        var InstructorCred = new userCredTable(req.body);

        // Create token
        const token = jwt.sign(
            { _id: InstructorCred._id, email:email, role:role },
            "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
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







