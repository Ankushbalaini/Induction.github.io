module.exports = (app) => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Add a new company
  router.post("/add", company.add);

  // list all companies
  router.get("/list", company.list);

   //update company values
   router.put('/edit/:id',company.edit);

  // need token for this request
  router.put('/update',company.update);


  // soft delete company

  app.use("/api/company", router);
};
