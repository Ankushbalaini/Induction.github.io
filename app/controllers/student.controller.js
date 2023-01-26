const db = require("../models");
const UserCred = db.user_cred;
const User = db.users;

/*
 * All student api for super admin
 *
 * @ Singh
 */

exports.index = (req, res) => {
  UserCred.aggregate([
    {
      $match: { $expr: { $eq: ["$role", "user"] } },
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
      $unwind: "$profile"
    },

    {
      $project: {
        _id: 1,
        email: 1,
        role: 1,
        profile: 1,
      },
    },
  ])
    .then((data) => {
      res.status(200).send({
        status: true,
        message: "All students Listing",
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







