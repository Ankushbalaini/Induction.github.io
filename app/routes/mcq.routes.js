module.exports = (app) => {
    const mcq = require("../controllers/mcq.controller.js");

    var router = require("express").Router();
  
    // Add a new company
    router.post("/add", mcq.add);
  
    router.get("/:id", mcq.index);

    router.post("/start/:inductionID", mcq.startTest);

    router.post("/submit/:testID", mcq.submitTest);
  
    app.use("/api/mcq", router);
  };
  