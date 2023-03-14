const { id } = require("date-fns/locale");

module.exports = (app) => {
  const slide = require("../controllers/slide.controller.js");

  var router = require("express").Router();

  //router.get("/", slide.add);

  // router.get("/", slide.index); // liting all

  router.post("/", slide.add); // add
  
  router.put("/:id", slide.update); // edit
  router.delete("/delete/:id",slide.delete); //delete 

  router.get("/getbyslideid/:id", slide.getBySlideId); // here id is slide ID

  // Retrieve all linked slides of induction by induction_id
  router.get("/:id", slide.findAllByInductionId); // here id is inductionID

  app.use("/api/slides", router);
};
