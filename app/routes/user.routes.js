const superadmin = require("../middleware/superadmin");
const admin_and_superadmin = require("../middleware/superadmin_admin");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", [ admin_and_superadmin ], users.findAll); // only superadmin, admin

    // Retrieve all published users
    router.get("/published", [admin_and_superadmin],users.findAllPublished);// only superadmin, admin
  
    // Retrieve a single User with id
    router.get("/:id", [admin_and_superadmin], users.findOne); // only superadmin, admin, owndetails
  
    // Update a User with id
    router.put("/:id", [admin_and_superadmin], users.update);// only superadmin, admin, owndetails
  
    // Delete a User with id
    router.delete("/:id", [admin_and_superadmin],users.delete);// only superadmin, admin
  
    // Delete all users
    router.delete("/", [admin_and_superadmin],users.deleteAll); // only superadmin



    // Login
    router.post("/login", users.login); // guest

    // reset password
    router.post("/reset-password", users.resetPassword); // guest

    // enter new password page
    router.post("/create-password", users.createPassword); // token based create password link
    
    // dashboard
    //router.get("/dashboard",[auth], users.dashboard); 
    
    app.use('/api/users', router);


  };








