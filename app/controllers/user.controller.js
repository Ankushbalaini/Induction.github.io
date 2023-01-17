const db = require("../models");
const UserCred = db.user_cred;
const User = db.users;
const CompanyDB = db.company;

var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d3c0c1af43828c",
    pass: "44f8d55e6acb74",
  },
});

/*
 * Signup API
 *
 * @ Singh
 */

exports.create = (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    // Validate request
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Fields can not be empty!");
    }

    // check if user already exist with same email id
    UserCred.findOne({ email: email })
      .then((result) => {
        if (result) {
          res.status(504).send({
            status: false,
            message: "Email already used.",
            data: {},
          });
        }
      })
      .catch((err) => {
        res.status(504).send({
          status: false,
          message: err.message,
        });
      });

    const user_cred = new UserCred({ ...req.body });
    // Create token
    const token = jwt.sign(
      { user_id: user_cred._id, email: user_cred.email, role: user_cred.role },
      "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
      {
        expiresIn: "2h",
      }
    );
    user_cred.token = token;

    user_cred.save().catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });

    req.body.user_id = user_cred._id;

    const user_detail = req.body;
    const { ["password"]: pwd, ...userWithoutPwd } = user_detail;

    const user = new User(userWithoutPwd);

    user
      .save()
      .then((data) => {
        res.status(201).send({
          status: true,
          message: "Signup successful",
          data: user_cred,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  } catch (e) {
    return res.status(504).send({
      status: false,
      message: e.message,
    });
  }

  return;
};

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
exports.update = (req, res) => {};

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
    role: role,
  })
    .then(function (user) {
      //console.log(user);
      if (user) {
        res.status(200).send({
          status: true,
          message: "Login Successful",
          data: {
            id: user._id,
            email: user.email,
            token: user.token,
            role: user.role,
            expiresIn: new Date(Date.now() + 2 * (60 * 60 * 1000)),
          },
        });
      } else {
        res.status(403).send({
          status: false,
          message: "User not found!",
          data: {}
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message,
      });
    });

  return;
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
  const { firstName, lastName, email, password, role } = req.body;

  // Validate request
  if (!firstName || !lastName || !email || !password) {
    res.status(500).send({
      status: false,
      message: "Fields can not be empty!",
    });
  }else{

  // Save entry in user cred table
  const user_cred = new UserCred({ ...req.body });
  const token = jwt.sign(
    { user_id: user_cred._id, email: user_cred.email, role: user_cred.role },
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

      req.body.user_id = user._id;

      const user_detail = req.body;
      const { ["password"]: pwd, ...userWithoutPwd } = user_detail;

      const newuser = new User(userWithoutPwd);

      newuser.save()
      .then((data)=>{
        res.status(200).send({
          status: true,
          message: "User registered successfully!",
          data: user_cred,
        });
      }).catch(err=>{
        res.status(400).send({
          status: false,
          message: err.message
        });
      })
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
