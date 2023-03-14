const db = require("../models/");
const SlideModel = db.induction_slides;
const Slides = db.induction_slides;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.add = (req, res) => {
  try {
    req.body.slideInductionId = ObjectId(req.body.slideInductionId);

    SlideModel(req.body)
      .save()
      .then((slide)=>{

        return res.status(200).send({
          status: true,
          message: "Slide added successfully!",
          data: slide
        });


      })
      .catch((error)=>{
        return res.status(404).send({
          status: false,
          message: error.message
        });
      });
      
  } catch (error) {
    return res.status(404).send({ status: false, message: error.message });
  }
};



/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 */
exports.update = (req, res) => {
  try {
    const quesID = req.params.id;
    
    SlideModel.updateOne(
      { _id: quesID },
      { $set: req.body },
      { multi: false },
      function (err, question) {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message,
          });
        }
        if (!question) {
          return res.status(500).send({
            status: false,
            message: "Slide not found!",
          });
        }else{
          return res.status(200).send({
            status: true,
            message: "Slide updated successfully!",
            data: question
          });
        }
      }
    );

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message || "Some error occurred.",
    });
  }
};


/**
 * @method get
 *
 * @author Singh
 */
exports.findAllByInductionId = (req, res) => {
  const id = req.params.id;

  SlideModel.find({ slideInductionId: id })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ status: false, message: "Induction not found!" });
      } else {
        res.send({
          status: true,
          data: data,
          message: "All Slides of this induction",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving induction with id="+id });
    });
  return;
};



/**
 * 
 * 
 */
exports.getBySlideId = (req, res) => {
  try {
    const id = req.params.id;
    SlideModel.findOne({ _id: id })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ status: false, message: "Slide not found!" });
      } else {
        return res.send({
          status: true,
          data: data,
          message: "Single slide by id",
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error retrieving induction with id="+id });
    });

      
  } catch (error) {
    return res.status(404).send({ status: false, message: error.message });
  }
};


  exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({
        status: false,
        message: "Invalid ID",
      });
      return;
    }
  
    SlideModel.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            status: false,
            message: "Slide not found",
          });
        } else {
          res.send({
            status:true,
            message: "Slide Deleted Successfully !",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          message: err.message,
        });
      });
  };
  
  