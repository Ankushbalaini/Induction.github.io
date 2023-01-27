const db = require("../models/");
const Induction = db.induction;
const SlideModel = db.induction_slides;
var jwt = require("jsonwebtoken");
const { findAll } = require("./user.controller");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


exports.getMyInductionsCount = (req, res) => {
  
}




/**
 * @method get
 *
 * @author Singh
 */
exports.index = async (req, res) => {
  // get token
  // verify token

  try {
    const token = req.headers["x-access-token"];
    const secret = "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1";
    const user = jwt.verify(token, secret);

    const page = (req.query.page > 0) ? req.query.page :  1;
    // const limit = 6;
    // const skips = 6 * (page-1);
    const limit = 3;
    const skips = 3 * (page-1);


    if (user.role == "instructor") {

      // return only own Inductions
      Induction.find({"createdBy": ObjectId(user.userID) }).limit(limit)
        .then((data) => {
          if (!data) {
            res
              .status(404)
              .send({ status: false, message: "Not found User with id " });
          } else {
            res.send({
              status: true,
              data: data,
              pagination: { totalRecords: 10, limit: limit, page: page},
              message: "My Inductions",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "Error retrieving User with id=" });
        });
    } else {
      
      const Inductions = await Induction.find({});

      // return all
      Induction.find({}).skip(skips).limit(limit)
        .then((data) => {
          if (!data) {
            return res.status(404)
              .send({ 
                status: false, message: "Not found User with id " });
          } else {
            //const total = Induction.find({}).count();

            return res.send({
              status: true,
              data: data,
              pagination: { totalRecords: Inductions.length, limit: limit, page: page},
              message: "All Inductions 1",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ status:false, message: err.message });
        });
    }

    return;

  } catch (error) {
    return res.status(403).json({ error: error.message });
  }


};

/**
 * @method post
 *
 * @author Singh
 */

exports.store = (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const secret = "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1";
    const user = jwt.verify(token, secret);
    
    req.body.induction.deptID       = ObjectId(req.body.deptID);
    req.body.induction.createdBy     = ObjectId(user.userID);
    req.body.induction.parentCompany = ObjectId(user.parentCompany);
    
    const slidesData = req.body.slides;

    const idata = new Induction(req.body.induction);
    idata
      .save(idata)
      .then((data) => {
        if (data) {

          slidesData.forEach((row) => {
            row.slideInductionId = ObjectId(data._id);
            var slide = new SlideModel(row);
            slide.save();
          });


          return res.status(200).send({
            status: true,
            message: "Induction created",
            data: data,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message:
            err.message || "Some error occurred while creating new induction.",
        });
      });
    return;
  } catch (err) {
    return res.status(500).send({
      status: false,
      message:
        err.message || "Some error occurred while creating new induction.",
    });
  }
};




exports.store_19Jan = (req, res) => {
  try {
    const idata = new Induction(req.body.induction);
    const slidesData = req.body.slides;

    idata
      .save(idata)
      .then((data) => {
        if (data) {
          slidesData.forEach((row) => {
            row.slideInductionId = data._id;

            var slide = new SlideModel(row);
            slide.save();
          });

          return res.status(200).send({
            status: true,
            message: "Induction created",
            data: data,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message:
            err.message || "Some error occurred while creating new induction.",
        });
      });
    return;
  } catch (err) {
    return res.status(500).send({
      status: false,
      message:
        err.message || "Some error occurred while creating new induction.",
    });
  }
};

exports.store_org_17jan = (req, res) => {
  const idata = new Induction(req.body.induction);
  const slidesData = req.body.slides;

  idata
    .save(idata)
    .then((data) => {
      if (data) {
        slidesData.forEach((row) => {
          row.slideInductionId = data._id;
          //console.log(row);
          var slide = new SlideModel(row);
          slide.save();
        });

        return res.status(200).send({
          status: true,
          message: "Induction created",
          data: data,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating new induction.",
      });
    });

  return;
};

// Find a single Induction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Induction.findById(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Not found Induction with id " + id });
      } else {
        SlideModel.find({ slideInductionId: id })
          .then((slides) => {
            if (!slides) {
              return res
                .status(404)
                .send({ status: false, message: "Not found User with id " });
            } else {
              return res.send({
                status: true,
                data: data,
                slides: slides,
                message: "Resonse send inside data12",
              });
            }
          })
          .catch((err) => {
            return res.status(500).send({ message: err.message });
          });
      }

      //   return res.send({
      //     status: true,
      //     data: data,
      //     //slides: slides,
      //     message: 'Resonse send inside data12'
      // });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Induction with id=" + id });
    });
};







