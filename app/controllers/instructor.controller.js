const db = require("../models");
const InstructorTable = db.instructor;
const UserCred = db.user_cred;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var jwt = require("jsonwebtoken");
const { instructor } = require("../models");

/**
 * For super Admin
 * 
 */
exports.list = (req, res) => {
  try {
    UserCred
      .aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$role", "instructor"],
                }
              ],
            },
          },
        },
        {
          $lookup: {
            from: "instructors",
            localField: "_id",
            foreignField: "userID",
            as: "profile",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $project: {
            _id: 1,
            email: 1,
            role: 1,
            parentCompany: 1,
            profile: 1,
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
    return;
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
      data: {},
    });
  }
};




/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.listByCompany = (req, res) => {
  try {
    var cond = mongoose.Types.ObjectId.isValid(req.query.parentCompany);

    if (!cond) {
      throw new Error("Parent Company Id not exist.");
    }

    UserCred
      .aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$role", "instructor"],
                },
                {
                  $eq: ["$parentCompany", ObjectId(req.query.parentCompany)],
                },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "instructors",
            localField: "_id",
            foreignField: "userID",
            as: "profile",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $project: {
            _id: 1,
            email: 1,
            role: 1,
            parentCompany: 1,
            profile: 1,
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
    return;
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
      data: {},
    });
  }
};





/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * instructor@gmail.com
 */
exports.add = (req, res) => {
  try {
    const { email, role } = req.body;

    req.body.parentCompany = ObjectId(req.body.parentCompany);
    var InstructorCred = new UserCred(req.body);

    // Create token
    const token = jwt.sign(
      { _id: InstructorCred._id, email: email, role: role },
      "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
      {
        expiresIn: "2h",
      }
    );
    
    // save user token
    InstructorCred.token = token;
    InstructorCred.save();

    req.body.userID = ObjectId(InstructorCred._id);
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
  } catch (e) {
    return res.status(400).send({
      status: false,
      message: "catch" + e.message,
      data: {},
    });
  }
};
