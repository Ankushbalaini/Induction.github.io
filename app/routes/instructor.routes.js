module.exports = (app) => {
  const instructor = require("../controllers/instructor.controller.js");

  var router = require("express").Router();

  // Add a new instructor
  router.post("/add", instructor.add);

  // list all instructors
  router.get("/list", instructor.list);

  //listByCompany
  router.get("/listByCompany", instructor.listByCompany);


  // Retrieve a single instructor with id
   router.put("/edit/:id", instructor.edit );

  // soft delete instructor

  app.use("/api/instructor", router);
};
