const db = require("../models");
const InstructorTable = db.instructor;
const UserCred = db.user_cred;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const UserInductionResults = db.user_induction_results;

var jwt = require("jsonwebtoken");
const { instructor } = require("../models");

/**
 * For super Admin
 *
 */
exports.list = (req, res) => {
  UserCred.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: ["$role", "instructor"],
            },
          ],
        },
      },
    },
    { $sort: { createdAt: -1 } },
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
        status: 1,
        parentCompany: 1,
        profile: 1,
        createdAt: 1,
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
      if (err.code === 11000) { // Handle duplicate email error
        return res.status(400).send({
          status: false,
          message: "Email already exists.",
          data: {},
        });
      }
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
 */
exports.listByCompany = (req, res) => {
  try {
    var cond = mongoose.Types.ObjectId.isValid(req.query.parentCompany);

    if (!cond) {
      throw new Error("Parent Company Id not exist.");
    }

    UserCred.aggregate([
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
          status: 1,
          parentCompany: 1,
          profile: 1,
          createdAt: 1,
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

exports.filterByCompany = (req, res) => {
  try {
    var cond = mongoose.Types.ObjectId.isValid(req.query.filterByCompany);

    if (!cond) {
      throw new Error("Company Id not exist.");
    }

    UserCred.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ["$parentCompany", ObjectId(req.query.filterByCompany)],
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
          status: 1,
          parentCompany: 1,
          profile: 1,
          createdAt: 1,
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
    // check who is adding instructor
    const user = req.decoded;
    const { email } = req.body;
    // logo validation

    if (!req.files || Object.keys(req.files).length === 0) {
      if (req.body.profilePhoto === "") {
        return res.status(500).send({
          status: false,
          message: "Profile Photo is required!",
        });
      }
    } else {
      var Img = req.files.profilePhoto;
      var uploadPath = "images/profile/" + Img.name;

      Img.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message,
          });
        }
      });
      //instructorData.profilePhoto = Img.name;
    }

    req.body.parentCompany =
      user.role === "company"
        ? ObjectId(user.userID)
        : ObjectId(req.body.parentCompany);
    //console.log(req.body); return;
    req.body.deptID = ObjectId(req.body.deptID);

    UserCred.findOne({ email: email }).then((existingUser) => {
      if (existingUser) {
        return res.status(400).send({
          status: false,
          message: "Email already exists!",
        });
      }

      //Create new user  
      var InstructorCred = new UserCred(req.body);
      InstructorCred.save();

      req.body.userID = ObjectId(InstructorCred._id);
      var instructorData = new InstructorTable(req.body);

      instructorData.profilePhoto = Img.name;

      instructorData
        .save()
        .then((response) => {
          return res.status(200).send({
            status: true,
            message: "Instructor Has been added Successfully!",
            data: response,
          });
        })

        .catch((err) => {
          return res.status(400).send({
            status: false,
            message: err.message,
            data: req.body,
          });
        });
    });
  } catch (e) {
    return res.status(400).send({
      status: false,
      message: "catch " + e.message,
      data: {},
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 */
exports.edit = (req, res) => {
  try {
    const id = ObjectId(req.params.id);

    // logo validation
    if (!req.files || Object.keys(req.files).length === 0) {
      if (req.body.profilePhoto === "") {
        return res.status(500).send({
          status: false,
          message: "Profile photo is required!",
        });
      }
    } else {
      var Img = req.files.image;
      var uploadPath = "images/profile/" + Img.name;

      Img.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message,
          });
        }
      });
      req.body.profilePhoto = Img.name;
    }

    InstructorTable.findByIdAndUpdate(
      id,
      { ...req.body },
      { useFindAndModify: true }
    )
      .then(function (user) {
        if (!user) {
          res.status(404).send({
            message: "Instructor not found!",
            status: false,
          });
        } else {
          return res.status(200).send({
            message: "Instructor has been updated successfully!",
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
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

/**
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.inductionsDm = (req, res) => {
  try {
    //   const userID = ObjectId(req.decoded.userID);
    //   const indution = req.decoded;
    //  const user = req.decoded;

    //  if(user.role ==='instructor'){
    //   UserInductionResults
    //     .find({ inductionID: ObjectId(user.inductionID) })
    //     // .populate({
    //     //   path: 'inductionID',
    //     //   select: 'title'
    //     // })
    //     .sort({ createdAt: -1 })
    //     .then((data) => {
    //       return res.status(200).send({
    //         message: "Success here",
    //         status: true,
    //         data: data,
    //       });
    //     })
    //     .catch((err) => {
    //       return res.status(500).send({
    //         message: err.message,
    //         status: false,
    //       });
    //     });
    //  }
    return res.send(200).send({
      message: "Hello",
      status: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      status: false,
    });
  }
};
