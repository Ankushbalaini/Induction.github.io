module.exports = (app) => {
    const mcq = require("../controllers/mcq.controller.js");

    var router = require("express").Router();
  
    // Add a new company
    router.post("/add", mcq.add);
  
  
    app.use("/api/mcq", router);
  };
  