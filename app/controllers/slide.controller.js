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
          message: "Add post response",
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
          .send({ status: false, message: "Not found User with id " });
      } else {
        res.send({
          status: true,
          data: data,
          message: "All slides of this induction",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" });
    });
  return;
};
