module.exports = (app) => {
  const instructor = require("../controllers/instructor.controller.js");

  var router = require("express").Router();

  // Add a new instructor
  router.post("/add", instructor.add);

  // list all companies
  router.get("/list", instructor.list);

  // Retrieve a single instructor with id
  //router.get("/:id", instructor.findOne );

  // soft delete instructor

  app.use("/api/instructor", router);
};
