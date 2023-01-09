const db = require("../models/");
const SlideModel  = db.induction_slides;

/**
 * @method get
 * 
 * @author Singh
 */
exports.findAllByInductionId = (req, res) => {
    const id = req.params.id;

    SlideModel.find({slideInductionId:id})
    .then(data => {
      if (!data){
        res.status(404).send({ status: false, message: "Not found User with id " });
      }else{ 
        res.send({
          status: true, 
          data: data,
          message: 'All slides of this induction'
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id="});
    });
    return;
}
