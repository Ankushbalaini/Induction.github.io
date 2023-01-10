module.exports = app => {
    const company = require("../controllers/company.controller.js");
  
    var router = require("express").Router();
  
    // Add a new company
    router.post("/add", company.add);

    // list all companies
    //router.get("/list", company.list);

    // Retrieve a single company with id
    //router.get("/:id", company.findOne ); 
    
    // soft delete company 

    app.use('/api/company', router);
}