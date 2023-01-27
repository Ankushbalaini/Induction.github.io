module.exports = (app) => {
    const mcq = require("../controllers/mcq.controller.js");

    var router = require("express").Router();
  
    // Add a new company
    router.post("/add", mcq.add);
  
    router.get("/:id", mcq.index);

    router.post("/start/:inductionID", mcq.startTest);
  
    app.use("/api/mcq", router);
  };
  