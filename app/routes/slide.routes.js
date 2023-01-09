module.exports = app => {
    const slide = require("../controllers/slide.controller.js");

    var router = require("express").Router();
  
    // Retrieve all linked slides of induction by induction_id
    router.get("/:id", slide.findAllByInductionId ); 
    
    app.use('/api/slides', router);
}