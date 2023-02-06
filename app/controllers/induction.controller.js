const db = require("../models/");
const Induction = db.induction;
const SlideModel = db.induction_slides;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var path = require("path");

const UPLOADS = {
  INDUCTIONS: "images/inductions/",
  PROFILE: "images/profile/",
};

exports.getMyInductionsCount = (req, res) => {};

/**
 * @method get
 *
 * @author Singh
 */
exports.index = async (req, res) => {
  // get token
  // verify token

  try {
    // const token = req.headers["x-access-token"];
    // const secret = "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1";
    // const user = jwt.verify(token, secret);
    const user = req.decoded;

    const page = req.query.page > 0 ? req.query.page : 1;
    // const limit = 6;
    // const skips = 6 * (page-1);
    const limit = 3;
    const skips = 3 * (page - 1);

    if (user.role == "instructor") {
      // return only own Inductions

      Induction.aggregate([
        {
          $match: { $expr: { $eq: ["$createdBy", ObjectId(user.userID)] } },
        },
        {
          $lookup: {
            from: "induction_slides",
            localField: "_id",
            foreignField: "slideInductionId",
            as: "slides",
          },
        },
        {
          $unwind: "$_id",
        },
        
        {
          $project: {
            _id: 1,
            title: "$title",
            subTitle: "$subTitle",
            thumbnail: "$thumbnail",
            description: 1,
            deptID:1,
            parentCompany:1,
            createdBy:1,
            numOfSlides: { $size: "$slides" },
            slides: "$slides",
          },
        }
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "Inductions",
            data: data,
            pagination: {
              totalRecords: data.length
            }
            
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
            totalRecords: 0
          });
        });
        /*
      Induction.find({ createdBy: ObjectId(user.userID) })
        .sort({ createdAt: -1 })
        .limit(limit)
        .then((data) => {
          if (!data) {
            res
              .status(404)
              .send({ status: false, message: "Not found User with id " });
          } else {
            res.send({
              status: true,
              data: data,
              pagination: { totalRecords: 10, limit: limit, page: page },
              message: "My Inductions",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "Error retrieving User with id=" });
        });
        */



    } else if(user.role == "company"){
      Induction.aggregate([
        {
          $match: { $expr: { $eq: ["$parentCompany", ObjectId(user.userID)] } },
        },
        {
          $lookup: {
            from: "induction_slides",
            localField: "_id",
            foreignField: "slideInductionId",
            as: "slides",
          },
        },
        {
          $unwind: "$_id",
        },
        
        {
          $project: {
            _id: 1,
            title: "$title",
            subTitle: "$subTitle",
            thumbnail: "$thumbnail",
            description: 1,
            deptID:1,
            parentCompany:1,
            createdBy:1,
            numOfSlides: { $size: "$slides" },
            slides: "$slides",
          },
        }
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "Inductions",
            data: data,
            body: req.decoded,
            pagination: {
              totalRecords: data.length
            }
            
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
            totalRecords: 0
          });
        });

    }else{
      // .populate('eventsAttended')
      Induction.aggregate([
        {
          $match: {  },
        },
        {
          $lookup: {
            from: "induction_slides",
            localField: "_id",
            foreignField: "slideInductionId",
            as: "slides",
          },
        },
        {
          $unwind: "$_id",
        },
        
        {
          $project: {
            _id: 1,
            title: "$title",
            subTitle: "$subTitle",
            thumbnail: "$thumbnail",
            description: 1,
            deptID:1,
            parentCompany:1,
            createdBy:1,
            numOfSlides: { $size: "$slides" },
            slides: "$slides",
          },
        }
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "Inductions",
            data: data,
            pagination: {
              totalRecords: data.length
            }
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
            totalRecords: 0
          });
        });

/*
      const Inductions = await Induction.find({});

      // return all
      Induction.find({})
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(limit)
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              status: false,
              message: "Not found User with id ",
            });
          } else {
            //const total = Induction.find({}).count();

            return res.send({
              status: true,
              data: data,
              pagination: {
                totalRecords: Inductions.length,
                limit: limit,
                page: page,
              },
              message: "All Inductions",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ status: false, message: err.message });
        });
        */
       
    }

    return;
    
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

/**
 * @method post
 * change: added thumbnail in this version
 * @author Singh
 */
exports.store_1feb_bk = (req, res) => {
  try {
    // const token = req.headers["x-access-token"];
    // const secret = "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1";
    // const user = jwt.verify(token, secret);
    const user = req.decoded;

    let iData = JSON.parse(req.body.induction);

    // logo validation
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(500).send({
        status: false,
        message: "Thumbnail is required!",
      });
    } else {
      var Img = req.files.thumbnail;
      var extension = path.extname(Img.name);
      var file_name = "img-" + Date.now() + extension;
      var uploadPath = "images/inductions/" + file_name;
      Img.mv(uploadPath, file_name, function (err) {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message,
          });
        }
      });
      iData.thumbnail = file_name;
    }

    iData.deptID = ObjectId(req.body.deptID);
    iData.createdBy = ObjectId(user.userID);
    iData.parentCompany = ObjectId(user.parentCompany);

    // added slides
    var slidesData = req.body.slides;
    slidesData = JSON.parse(slidesData);

    const idata = new Induction(iData);
    idata
      .save(idata)
      .then((data) => {
        if (data) {
          slidesData.forEach((row) => {
            //row = JSON.parse(row);
            row.slideInductionId = ObjectId(data._id);
            var slide = new SlideModel(row);
            slide.save();
          });
        }

        return res.status(200).send({
          status: true,
          message: "Induction created",
          data: data,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message:
            err.message || "Some error occurred while creating new induction.",
        });
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message:
        err.message || "Some error occurred while creating new induction.",
    });
  }
};

// without thumbnail
exports.store_29Jan = (req, res) => {
  try {
    // const token = req.headers["x-access-token"];
    // const secret = "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1";
    // const user = jwt.verify(token, secret);
    const user = req.decoded;

    req.body.induction.deptID = ObjectId(req.body.deptID);
    req.body.induction.createdBy = ObjectId(user.userID);
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
exports.findOne_new = (req, res) => {
  const id = ObjectId(req.params.id);

  Induction.aggregate([
    {
      $match: { $expr: { $eq: ["$_id", id] } },
    },
    {
      $lookup: {
        from: "induction_slides",
        localField: "_id",
        foreignField: "slideInductionId",
        as: "slides",
      },
    },
    {
      $unwind: "$_id",
    },
    {
      $project: {
        _id: 1,
        title: "$title",
        subtitle: "$subTitle",
        thumbnail: "$thumbnail",
        numOfSlides: { $size: "$slides" },
        slides: "$slides",
      },
    },
  ])
    .then((data) => {
      return res.status(200).send({
        status: true,
        message: "Inductions",
        data: data[0],
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message,
        data: {},
      });
    });
};

// Find a single Induction with an id- working fine
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
                message: "Resonse send inside data",
              });
            }
          })
          .catch((err) => {
            return res.status(500).send({ message: err.message });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Induction with id=" + id });
    });
};

/**
 * @method post
 * change: added thumbnail in this version
 * @author Singh
 */
exports.store = async (req, res) => {
  try {

    const user      = req.decoded;
    const thumbnail = uploadThumbnail(req, res);

    let iData       = JSON.parse(req.body.induction);
    iData.deptID    = ObjectId(req.body.deptID);
    iData.createdBy = ObjectId(user.userID);
    iData.parentCompany = (user.role ==='company')? ObjectId(user.userID) :ObjectId(user.parentCompany);
    iData.thumbnail = thumbnail;


    var idata = new Induction(iData);

    var attached_slide = req.body.slides;
    slidesData = JSON.parse(attached_slide);

    slidesData.forEach((row) => {  
      row.slideInductionId = idata._id;
      var slides = new SlideModel(row);
      idata.attachedSlides.push(slides);
    });

    idata
      .save()
      .then((data) => {
         //slides.save();
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


      }).catch((err) => {
        return res.status(500).send({
          status: false,
          message:
            err.message || "Some error occurred while creating new induction.",
        });
      });

  } catch (err) {
    return res.status(500).send({
      status: false,
      message:
        err.message || "Some error occurred while creating new induction.",
    });
  }
};

/**
 * @param files-object
 *
 * @returns img-name
 */
function uploadThumbnail(req, res) {
  // logo validation
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(500).send({
      status: false,
      message: "Thumbnail is required!",
    });
  } else {
    var Img = req.files.thumbnail;
    var extension = path.extname(Img.name);
    var file_name = "img-" + Date.now() + extension;
    var uploadPath = UPLOADS.INDUCTIONS + file_name;
    
    Img.mv(uploadPath, file_name, function (err) {
      if (err) {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      }
    });
    return file_name;
  }
}



exports.updatePassingMarks = (req, res) =>{
  // req.body.inductionID
  // req.body.passPercentage
  Induction.findOneAndUpdate( { _id: ObjectId(req.body.inductionID) },
    { passPercentage: req.body.passPercentage })
    .then((induction)=>{
      if (induction) {
        return res.status(200).send({
          status: true,
          message: "Pass Percentage has been updated!",
          data: induction,
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Pass Percentage not changed",
        });
      }

    })
    .catch((error)=>{
      return res.status(500).send({
        status: false,
        message: error.message,
      });
    });


}