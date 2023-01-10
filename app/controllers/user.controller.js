const db = require("../models");
const User = db.users;
const CompanyDB = db.company;

var jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d3c0c1af43828c",
    pass: "44f8d55e6acb74"
  }
});


// Create and Save a new Tutorial
    exports.create = (req, res) => {

      //console.log(req.body);
      //return res.status(400).send({ req.body });

        const {firstName, lastName, email, password} = req.body;

        // Validate request
        if (!firstName && !email && !password) {
          res.status(400).send({ 
            status: false, 
            message: "Fields can not be empty!" 
          });
          return;
        }

        // check if user already exist
        // Validate if user exist in our database
        User.findOne({ email:  email })
        .then(function(result){
            if (result) {
              res.status(400).send({ 
                status: false, 
                message: "Email already used.",
                data: result
              });
              return;
            } 
        });

        //encryptedPassword = bcrypt.hash(req.body.password, 10);

        // Create a User
        const user = new User({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            user_type: req.body.user_type,
            published: req.body.published ? req.body.published : false
        });

        // Create token
        const token = jwt.sign(
          { user_id: user._id, email , user_type : user.user_type},
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
            .then(data => {
              res.send({
                status: true,
                message: "Signup successful",
                data: data
              });
            })
            .catch(err => {
              res.status(500).send({
                status: false,
                message:
                  err.message || "Some error occurred while creating the User."
              });
            });
      };

      
// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  // res.status(400).send({ message: "Superadmin " + process.env.PORT });
  //     return;


  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// Retrieve all Users from the database.
exports.findAllByDept = (req, res) => {

  res.status(400).send({ message: "Dept Admin " });
      return;

  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
    
};



// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};



// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};


// Find a single User with an id
exports.login = (req, res) => {
  const {userType, email, password} = req.body;

  switch (userType) {
    case 'superadmin':
      //Statements executed when the
      //result of expression matches value1
      break;
    case 'admin':
      //Statements executed when the
      //result of expression matches value2
      break;
    case 'company':
      //Statements executed when the


      CompanyDB.findOne({ email:  email, password: password }).then(function(user){
        if(user){
          // create a jwt token for Auth Requests
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email , user_type : user.user_type},
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
          
          res.status(200).send({
            status: true, 
            message:"Login Successful",
            data: user
          });
        }else{
          res.status(404).send({
              status : false, 
              message: "Invalid Credentials"
          });
        }
      });

      
      break;

    default:
      //Statements executed when none of

      User.findOne({ email:  email, password: password , user_type : userType}).then(function(user){
        if(user){
          // create a jwt token for Auth Requests
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email , user_type : user.user_type},
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
          
          res.status(200).send({
            status: true, 
            message:"Login Successful",
            data: user
          });
        }else{
          res.status(404).send({
              status : false, 
              message: "Invalid Credentials"
          });
        }
      });
      break;

  }


    

  

  
  return;
};




// reset password request

exports.resetPassword = (req, res) => {
  const {email} = req.body;

  User.findOne({ email:  email }).then(function(user){
    if(user){
      
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


      var link = "http://localhost:3000/recovery-password/"+user.token;

      // sending email code
      var mailOptions = {
        from: 'bjs-induction@gmail.com',
        to: 'developer3030@gmail.com',
        subject: 'BJS-Induction - Reset password',
        text: 'Click here to change password == '+ link
      };
      
      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


      res.status(200).send({ 
        status:true,
        message: "Please check your email and rest password.",
        token: token,
      });
    }else{
      res.status(404).send({ 
        status : false, 
        message: "User email not registered with our system."
      });
    }
  });

}


exports.createPassword = (req, res) => {

  const { token, password } = req.body;
  
  const decoded = jwt.verify(token, 
    "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1",
    function(err, decoded) {
      if (err) {
        res.status(200).send({ 
          status:false,
          message: err.message
        });
      }else{
        req.user = decoded;
      }
    });

    // find user and update password 
    User.findOne({ email:  req.user.email }).then(function(user){
      if(user){
        User.updateOne({ email: req.user.email }, {password}, function(err, res) {
          if (err) {
            res.status(200).send({ 
              status:false,
              message: err.message
            });
          }
        });

        res.status(200).send({ 
          status:true,
          message: "password changed "
        });

      }else{
        
        res.status(404).send({ 
          status : false, 
          message: "Invalid link"
        });
      
      }
  });
  
}