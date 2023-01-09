const db = require("../models/");
const Induction  = db.induction;
const SlideModel  = db.induction_slides;

/**
 * @method get
 * 
 * @author Singh
 */
exports.index = (req, res) => {

//   db.induction.aggregate([
//     { $lookup:
//         {
//            from: "induction_slides",
//           localField: "_id",
//           foreignField: "slideInductionId",
//            as: "slides"
//         }
//     }
// ]).then(data => {
//   //console.log(data);
//   res.send({
//     status: true, 
//     data: data,
//     message: 'Resonse send inside data'

//   });

// });



  Induction.find({})
    .then(data => {
      if (!data){
        res.status(404).send({ status: false, message: "Not found User with id " });
      }else{ 
        res.send({
          status: true, 
          data: data,
          message: 'Resonse send inside data'

        });
      }


    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id="});
    });



}


/**
 * @method post
 * 
 * @author Singh
 */
exports.store = (req, res) => {
  const idata       = new Induction(req.body.induction);
  const slidesData  = req.body.slides;

  idata
    .save(idata)
    .then(data => {
      if(data){
        slidesData.forEach(row => {
          row.slideInductionId = data._id;
          //console.log(row);
          var slide = new SlideModel(row);
          slide.save();
        });


        return res.status(200).send({ 
          status: true, 
          message: "Induction created",
          data: data
        });


      }
    })
    .catch(err=>{
      return res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating new induction."
      });
    });



  

  return; 

  /*
  idata
    .save(idata)
    .then(data => {

      // get data._id
      // and put this id inside slide table

    AllSlides.forEach(row => {
      row.slideInductionId = data._id;
      //console.log(row);
      let Slides = new Slide(row);

      Slides.save(Slides);

    });slidesData
        message: "Induction Created",
        data: data
      });    
  })
  .catch(err => {
    return res.status(500).send({
      status: false,
      message:
        err.message || "Some error occurred while creating new induction."
    });
  });

  */
}





// Find a single Induction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Induction.findById(id)
    .then(data => {
      if (!data){
        return res.status(404).send({ message: "Not found Induction with id " + id });

      } else{

        SlideModel.find({slideInductionId:id})
        .then(slides => {
          if (!slides){
            return res.status(404).send({ status: false, message: "Not found User with id " });
          }else{

            return res.send({
              status: true, 
              data: data,
              slides: slides,
              message: 'Resonse send inside data12'
      
            });
          }
        }).catch(err=>{
         return res
          .status(500)
          .send({ message: err.message});
        });
      }


      //   return res.send({
      //     status: true, 
      //     data: data,
      //     //slides: slides,
      //     message: 'Resonse send inside data12'
      // });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Induction with id=" + id });
    });

};








/**
 * @method post
 * 
 * @author Singh
 */
exports.store_bk = (req, res) => {
  // console.log(req.body.induction);
  const idata = new Induction(req.body.induction);
  //const slidesData = new SlideModel(req.body.slides);

  // const newSlide = new SlideModel({
  //   slideTitle: 'Slide 1',
  //   slideContent: 'Slide 1 content',
  //   slideInductionId: '63b6862bc7ac344d83a01bca'
  // });

  // newSlide
  //   .save()
  //   .then(data => {

  //     // get data._id
  //     // and put this id inside slide table 
  //     return res.status(200).send({ 
  //       status: true, 
  //       message: "Slide Created",
  //       data: data
  //     });    
  // })
  // .catch(err => {
  //   return res.status(500).send({
  //     status: false,
  //     message:
  //       err.message || "Some error occurred while creating new induction."
  //   });
  // });







  
  

  // slidesData.forEach(row => {
  //     row.slideInductionId = slideInductionId;
  //     //console.log(row);
  //     let Slides = new Slide(row);

  //     Slides.save(Slides);

  //   });




}
