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
    const { firstName, lastName, email, password, user_type } = req.body;
    // Validate request
    if (!firstName && !lastName && !email && !password) {
      throw new Error("Fields can not be empty!");
    }

    // check if user already exist with same email id
    UserCred.findOne({ email: email })
      .then((result) => {
        if (result) throw new Error("Email already used.");
      })
      .catch((err) => {
        return res.status(504).send({
          status: false,
          message: err.message,
          data: {},
        });
      });

    const user_cred = new UserCred({ ...req.body });
    // user_cred.user_type = user_type ? user_type : 'user';
    // Create token
    const token = jwt.sign(
      { user_id: user_cred._id, email, user_type: user_type },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      {
        expiresIn: "2h",
      }
    );
    user_cred.token = token;

    user_cred.save().catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });

    const user = new User({ ...req.body });
    user.user_id = user_cred._id;
    user
      .save()
      .then((data) => {
        return res.status(201).send({
          status: true,
          message: "Signup successful",
          data: data,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  } catch (e) {
    return res.status(504).send({
      status: false,
      message: e.message,
      data: {},
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
  const { user_type, email, password } = req.body;

  UserCred.findOne({
    email: email,
    password: password,
    user_type: user_type,
  }).then(function (user) {
    //console.log(user);
    if (user) {
      // create a jwt token for Auth Requests
      const token = jwt.sign(
        { user_id: user._id, email, user_type: user.user_type },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      res.status(200).send({
        status: true,
        message: "Login Successful",
        data: user,
      });
    } else {
      res.status(404).send({
        status: false,
        message: "Invalid Credentials",
      });
    }
  });

  return;
};

// reset password request

exports.resetPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }).then(function (user) {
    if (user) {
      // send email to user email for creatibng new password based on token

      const token = jwt.sign(
        { user_id: user._id, email },
        "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      var link = "http://localhost:3000/recovery-password/" + user.token;

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

      res.status(200).send({
        status: true,
        message: "Please check your email and rest password.",
        token: token,
      });
    } else {
      res.status(404).send({
        status: false,
        message: "User email not registered with our system.",
      });
    }
  });
};

exports.createPassword = (req, res) => {
  const { token, password } = req.body;

  const decoded = jwt.verify(
    token,
    "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
    function (err, decoded) {
      if (err) {
        res.status(200).send({
          status: false,
          message: err.message,
        });
      } else {
        req.user = decoded;
      }
    }
  );

  // find user and update password
  User.findOne({ email: req.user.email }).then(function (user) {
    if (user) {
      User.updateOne(
        { email: req.user.email },
        { password },
        function (err, res) {
          user_type;
          if (err) {
            res.status(200).send({
              status: false,
              message: err.message,
            });
          }
        }
      );

      res.status(200).send({
        status: true,
        message: "password changed ",
      });
    } else {
      res.status(404).send({
        status: false,
        message: "Invalid link",
      });
    }
  });
};



exports.profile = (req, res) => {
  // token get

  // verify token

  // user detail 

  // data

  
  // query 



  res.status(200).send({
    status: true,
    message: "Profile data",
    data: {}
  });
  return;
}