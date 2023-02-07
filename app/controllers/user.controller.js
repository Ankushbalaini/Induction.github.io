const db = require("../models");
const UserCred = db.user_cred;
const User = db.users;
const CompanyDB = db.company;
const UserInductionResults = db.user_induction_results;
const Inductions = db.induction;


const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const e = require("express");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d3c0c1af43828c",
    pass: "44f8d55e6acb74",
  },
});

/**
 *
 * @param {*} req
 * @param {*} res
 */
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // res.status(400).send({ message: "Superadmin " + process.env.PORT });
  //     return;

  const username = req.query.username;
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  var userEmail = req.decoded.email; // get from auth token
  var role = req.decoded.role;

  if (!req.files || Object.keys(req.files).length === 0) {
    if (req.body.profilePhoto === "") {
      return res.status(500).send({
        status: false,
        message: "Logo is required!",
      });
    }
  } else {
    let Img = req.files.image;
    let uploadPath = "images/profile/" + Img.name;

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

  switch (role) {
    case "company":
      // company collection update

      break;

    case "instructor":
      // instructor collection
      break;

    default:
      // users colletion
      User.updateOne(
        { email: userEmail },
        { $set: req.body },
        { multi: true },
        function (err, user) {
          if (err) {
            return res.status(500).send({
              status: false,
              message: err.message,
            });
          }
          if (!user) {
            return res.status(500).send({
              status: false,
              message: "User not found!",
            });
          } else {
            return res.status(200).send({
              status: true,
              message: "User has been updated!",
              data: user,
            });
          }
        }
      );
      break;
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};

/**
 * @author Singh
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.login = (req, res) => {
  const { role, email, password } = req.body;

  UserCred.findOne({
    email: email,
    password: password,
  })
    .then(function (user) {

      // checking user status
      if(user.status === false){
        return res.status(500).send({
          status: false,
          message: "USER_DISABLED",
          data: {},
        });
      }
      if (user) {
        // create a new token
        const user_cred = new UserCred(user);
        // Create token
        const token = jwt.sign(
          {
            userID: user_cred._id,
            email: user_cred.email,
            role: user_cred.role,
            deptID: user_cred.deptID,
            parentCompany: user_cred.parentCompany
          },
          "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
          {
            expiresIn: "2h",
          }
        );
        user_cred.token = token;

        user_cred.save().catch((err) => {
          res.status(500).send({
            status: false,
            message: err.message,
          });
        });

        return res.status(200).send({
          status: true,
          message: "Login Successful",
          data: {
            id: user._id,
            email: user.email,
            token: user_cred.token,
            role: user.role,
            expiresIn: new Date(Date.now() + 2 * (60 * 60 * 1000)),
          },
        });
      } else {
        return res.status(403).send({
          status: false,
          message: "INVALID_PASSWORD",
          data: {},
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: "INVALID_PASSWORD",
      });
    });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.resetPassword = (req, res) => {
  const { email } = req.body;

  UserCred.findOne({ email: email }).then(function (user) {
    if (user) {
      const token = jwt.sign(
        { _id: user._id, email },
        "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1ey",
        {
          expiresIn: "2h",
        }
      );
      // save user token
      //user.token = token;

      // save user token
      var link = "http://localhost:3000/reset-password/" + token;

      // sending email code
      var mailOptions = {
        from: "bjs-induction@gmail.com",
        to: "developer3030@gmail.com",
        subject: "BJS-Induction - Reset password",
        text: "Click here to change password == " + link,
      };

      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.status(200).send({
        status: true,
        message: "Please check your email and rest password.",
        token: token,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "User email not registered with our system.",
      });
    }
  });
  return;
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.createPassword = (req, res) => {
  const { token, password } = req.body;

  const decoded = jwt.verify(
    token,
    "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1ey",
    function (err, decoded) {
      if (err) {
        return res.status(200).send({
          status: false,
          message: err.message,
        });
      } else {
        req.user = decoded;
      }
    }
  );

  // find user and update password
  UserCred.findOne({ email: req.user.email }).then(function (user) {
    if (user) {
      UserCred.updateOne(
        { email: req.user.email },
        { password },
        function (err, res) {
          if (err) {
            return res.status(200).send({
              status: false,
              message: err.message,
            });
          }
        }
      );

      return res.status(200).send({
        status: true,
        message: "password changed ",
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "Invalid link",
      });
    }
  });
};

exports.profile = (req, res) => {
  try {
    const user = req.decoded;

    switch (user.role) {
      case "super_admin":
        break;

      case "instructor":
        break;

      case "company":
        break;

      default:
        User.findOne({ email: user.email })
          .then(function (user) {
            if (user) {
              res.status(200).send({
                status: true,
                message: "Profile Api working fine",
                data: user,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              status: true,
              message: "Inside catch request" + err.message,
            });
          });
        break;
    }
    return;
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
  return;
};

/**
 *
 * @param {req} req
 * @param {} res
 * @returns
 */

exports.signUp = (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  // Validate request
  if (!first_name || !last_name || !email || !password) {
    res.status(500).send({
      status: false,
      message: "Fields can not be empty!",
    });
  } else {
    // Save entry in user cred table
    
    const user_cred = new UserCred({ ...req.body });
    const token = jwt.sign(
      { userID: user_cred._id, email: user_cred.email, role: user_cred.role },
      "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
      {
        expiresIn: "2h",
      }
    );
    user_cred.token = token;
    

    // here call save function
    user_cred
      .save()
      .then((user) => {
        req.body.userID = user._id;

        const user_detail = req.body;
        const { ["password"]: pwd, ...userWithoutPwd } = user_detail;

        const newuser = new User(userWithoutPwd);

        newuser
          .save()
          .then((data) => {
            res.status(200).send({
              status: true,
              message: "User registered successfully!",
              data: user_cred,
            });
          })
          .catch((err) => {
            res.status(400).send({
              status: false,
              message: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: err.message,
        });
      });
  }
  return;
};

/**
 *
 * @param {req} req
 * @param {} res
 * @returns
 */
exports.getProfile = async (req, res) => {
  try {
    const userRole = req.decoded.role;
    switch (userRole) {
      case "instructor":

        var totalInductions;

        await Inductions.find({ createdBy : ObjectId(req.decoded.userID) })
          .then((induction)=>{
              totalInductions = induction.length;
          })
          .catch((err)=>{err});
        

        UserCred.aggregate([
          {
            $match: { _id: ObjectId(req.decoded.userID) },
          },
          { $limit: 1 },
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
              createdAt: 1,
              profile: 1,
            },
          },
        ])
          .then((data) => {

            data[0].totalInductions = totalInductions;

            return res.status(200).send({
              status: true,
              message: "User profile",
              data: data[0],
            });
          })
          .catch((err) => {
            return res.status(500).send({
              status: false,
              message: err.message,
              data: {},
            });
          });

        break;
      case "company":

        var totalInductions, totalInstructors;

        await Inductions.find({ parentCompany : ObjectId(req.decoded.userID) })
          .then((induction)=>{
              totalInductions = induction.length;
          })
          .catch((err)=>{err});
        
        await UserCred.find({role:'instructor', parentCompany: ObjectId(req.decoded.userID) })
          .then((user)=>{
              totalInstructors = user.length;
          })
          .catch((err)=>{err});



        UserCred.aggregate([
          {
            $match: { _id: ObjectId(req.decoded.userID) },
          },
          { $limit: 1 },
          {
            $lookup: {
              from: "companies",
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
              createdAt: 1,
              profile: 1,
            },
          },
        ])
          .then((data) => {

            data[0].totalInductions = totalInductions;
            data[0].totalInstructors = totalInstructors;

            res.status(200).send({
              status: true,
              message: "Company profile",
              data: data[0],
              
            });
          })
          .catch((err) => {
            res.status(500).send({
              status: false,
              message: err.message,
              data: {},
            });
          });

        break;

        case "super_admin":

            var totalCompanies, totalUsers;

            await UserCred.find({role:'company' })
              .then((user)=>{
                totalCompanies = user.length;
              })
              .catch((err)=>{err});

            await UserCred.find({role:'user' })
              .then((user)=>{
                totalUsers = user.length;
              })
              .catch((err)=>{err});

              
            UserCred.aggregate([
            {
              $match: { _id: ObjectId(req.decoded.userID) },
            },
            { $limit: 1 },
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
                createdAt: 1,
                profile: 1,
              },
            },
          ])
            .then((data) => {

              data[0].totalCompanies = totalCompanies;
              data[0].totalUsers = totalUsers;


              res.status(200).send({
                status: true,
                message: "User profile ",
                data: data[0],
              });
            })
            .catch((err) => {
              res.status(500).send({
                status: false,
                message: err.message,
                data: {},
              });
            });
  
          break;

      default:
        UserCred.aggregate([
          {
            $match: { _id: ObjectId(req.decoded.userID) },
          },
          { $limit: 1 },
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
              createdAt: 1,
              profile: 1,
            },
          },
        ])
          .then((data) => {
            res.status(200).send({
              status: true,
              message: "User profile ",
              data: data[0],
            });
          })
          .catch((err) => {
            res.status(500).send({
              status: false,
              message: err.message,
              data: {},
            });
          });

        break;
    }
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: err.message,
    });
  }
};

//Edit the Students
/**
 * @description: Finding student by their ID and then updating the profile details
 *
 * @param req
 * @param res
 */
exports.edit = async (req, res) => {
  const id = req.params.id;

  

  if (!req.files || Object.keys(req.files).length === 0) {
    if (req.body.profilePhoto === "") {
      return res.status(500).send({
        status: false,
        message: "Profile image is required!",
      });
    }
  } else {
    let Img = req.files.image;
    let uploadPath = "images/profile/" + Img.name;

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

  // check request token values 

  if(req.decoded.role === 'super_admin'){
    req.body.deptID = ObjectId(req.body.deptID);
    req.body.parentCompany = ObjectId(req.body.parentCompany );
  }

  if(req.decoded.role === 'company'){
    // 
    req.body.parentCompany = ObjectId(req.body.userID);
  }

  if(req.decoded.role === 'instructor'){
    // pass parent company and dept 
    // undefined
    req.body.parentCompany = ObjectId(req.decoded.parentCompany);
  }

  

  // await new UserCred({deptID : req.body.deptID}).save();

  // users colletion
  User.updateOne(
    { _id: id },
    { $set: req.body },
    { multi: true },
    function (err, user) {
      if (err) {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      }
      if (!user) {
        return res.status(500).send({
          status: false,
          message: "User not found!",
        });
      } else {


        UserCred.updateOne(
          { _id: req.body.mainID },
          { $set: req.body },
          { multi: true })
          .then((user)=>{
            return res.status(200).send({
              status: true,
              message: "User has been updated!",
              data: user,
            });
          })
          .catch((err)=>{
            return res.status(500).send({
              status: false,
              message: err.message
            });
          });
      }
    }
  );
};

exports.setting = (req, res) => {
  try {
    const id = ObjectId(req.decoded.userID);

    UserCred.findOneAndUpdate(
      { _id: id, password: req.body.currentPassword },
      { password: req.body.newPassword },
      (error, user) => {
        // if error
        if (error) {
          return res.status(500).send({
            status: false,
            message: error.message,
          });
        }

        // if user
        if (user) {
          return res.status(200).send({
            status: true,
            message: "User has been updated!",
            data: user.value,
          });
        } else {
          return res.status(500).send({
            status: false,
            message: "Invalid details",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      status: false,
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.inductions = (req, res) => {
  try {
    const userID = ObjectId(req.decoded.userID);

    // 63d22a6b0fcd4d8baa9cc79f
    // 63d22a6b0fcd4d8baa9cc79f

    //var distinctIdCode = { $group: { _id: { team_code: "$team_code", team_id: "$team_id" } } }
    //db.foo.aggregate([distinctIdCode])
    /*
    db.user_induction_results.aggregate( [
      {
        $group: {
           _id: userID,
           count: { $count: { } },
        }
      }
    ] ).then((data)=>{
      return res.status(200).send({
        message: "Success here",
        status: true,
        data: data
      });
    })
    .catch((err)=>{
      return res.status(500).send({
        message: err.message,
        status: false
      });
    });

    */

    UserInductionResults
      .find({ userID: userID })
      .populate({
        path: 'inductionID',
        select: 'title'
      })
      .sort({ createdAt: -1 })
      .then((data) => {
        return res.status(200).send({
          message: "Success here",
          status: true,
          data: data,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message,
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      status: false,
    });
  }
};

/**
 * Toggle user status = active/inactive
 *
 */
exports.changeUserStatus = (req, res) => {
  // userID - cred table
  //
  try {
    UserCred.findOneAndUpdate(
      { _id: req.body.userID },
      { status: req.body.status ? false : true },
      (error, user) => {
        // if error
        if (error) {
          return res.status(500).send({
            status: false,
            message: error.message,
          });
        }

        // if user
        if (user) {
          return res.status(200).send({
            status: true,
            message: "User has been updated!",
            data: user.value,
          });
        } else {
          return res.status(500).send({
            status: false,
            message: "Status not changed",
          });
        }
      }
    );

    // return res.status(200).send({
    //   status: true,
    //   message: "Status Changed",
    //   data: req.body,
    // });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      data: {},
    });
  }
};


