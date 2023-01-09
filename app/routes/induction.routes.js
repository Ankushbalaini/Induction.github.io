module.exports = app => {
    const induction = require("../controllers/induction.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.get("/", induction.index);

    // Create a new Induction
    router.post("/store", induction.store);

    // Retrieve a single User with id
    router.get("/:id", induction.findOne ); 
    

    app.use('/api/induction', router);
}