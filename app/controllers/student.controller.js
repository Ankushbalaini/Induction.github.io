const db = require("../models");
const UserCred = db.user_cred;
const User = db.users;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.index = async (req, res) => {
  try {
    const user = req.decoded;
    // for super admin 
    if (user.role === "super_admin") {
      // by default on filter = ALL then req.query.company is undefined
      var filterCompany = (req.query.company === undefined || req.query.company==='All') ? { $exists: true } : ObjectId(req.query.company);
      var filterDepartment = (req.query.deptID === undefined || req.query.deptID==='All') ? { $exists: true } : ObjectId(req.query.deptID);

      var query = {
        role: "user", 
        parentCompany: filterCompany,
        deptID : filterDepartment
      }
    }

    // for company
    if (user.role === "company") {
      var filterCompany = ObjectId(user.userID);
      var filterDepartment = (req.query.deptID === undefined || req.query.deptID==='All') ? { $exists: true } : ObjectId(req.query.deptID);

      var query = {
        role: "user", 
        parentCompany: filterCompany,
        deptID : filterDepartment
      }
    }


    // for instructor
    if (user.role === "instructor") {
      var filterCompany = ObjectId(user.parentCompany);
      var filterDepartment = (req.query.deptID === undefined || req.query.deptID==='All') ? { $exists: true } : ObjectId(req.query.deptID);

      var query = {
        role: "user", 
        parentCompany: filterCompany,
        deptID : filterDepartment
      }
    }

    // super admin
    UserCred.find(query)
      .populate("profile")
      .sort( { createdAt : -1 } )
      .then((users) => {
        return res.status(200).send({
          status: true,
          message: "API is working fine!",
          data: users
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      });
      
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
      data: {},
    });
  }
};

//
const getStudentByCompany = async (req, res) => {
  UserCred.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: ["$role", "user"],
              $eq: ["$parentCompany", ObjectId(req.decoded.userID)],
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "email",
        foreignField: "email",
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
        deptID: 1,
        parentCompany: 1,
        status: 1,
        profile: 1,
        createdAt: 1,
      },
    },
  ])
    .then((data) => {
      return res.status(200).send({
        status: true,
        message: "All students Listing",
        data: data,
      });
    })
    .catch((err) => {
      // return res.status(500).send({
      //   status: false,
      //   message: err.message,
      //   data: {},
      // });
    });
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Api to GET unassined users who does not have any parent Company
 *
 */
exports.unassigned = (req, res) => {
  UserCred.find({ role: "user", parentCompany: { $exists: false } })
    .populate("profile")
    .sort( { createdAt : -1 } )
    .then((users) => {
      return res.status(200).send({
        status: true,
        message: "All students Listing",
        data: users,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    });
};
