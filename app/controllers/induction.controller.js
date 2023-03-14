const db = require("../models/");
const Induction = db.induction;
const SlideModel = db.induction_slides;
const InductionUsers = db.user_induction_results;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var path = require("path");

const UPLOADS = {
  INDUCTIONS: "images/inductions/",
  PROFILE: "images/profile/",
};

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

exports.getMyInductionsCount = (req, res) => {};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.index = (req, res) => {
  try {
    const user = req.decoded;
    var matchQuery = {};

    switch (user.role) {
      case USER_ROLES.SUPER_ADMIN:
        matchQuery = {};
        break;
      case USER_ROLES.COMPANY:
        matchQuery = {
          $expr: { $eq: ["$parentCompany", ObjectId(user.userID)] },
        };
        break;
      case USER_ROLES.INSTRUCTOR:
        matchQuery = { $expr: { $eq: ["$createdBy", ObjectId(user.userID)] } };
        break;
      default:
        matchQuery = {
          $expr: { $eq: ["$parentCompany", ObjectId(user.parentCompany)] },
        };
        break;
    }

    Induction.aggregate([
      {
        $match: matchQuery,
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
          deptID: 1,
          parentCompany: 1,
          createdBy: 1,
          numOfSlides: { $size: "$slides" },
        },
      },
    ])
      .then((data) => {
        return res.status(200).send({
          status: true,
          message: "All Inductions",
          data: data,
          pagination: {
            totalRecords: data.length,
          },
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      });
  } catch (err) {
    return res.status(403).send({
      status: false,
      message: err.message,
    });
  }
};

/**
 * @method get
 *
 * @author Singh
 */
exports.index_org = async (req, res) => {
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
            deptID: 1,
            parentCompany: 1,
            createdBy: 1,
            numOfSlides: { $size: "$slides" },
            slides: "$slides",
          },
        },
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "Inductions",
            data: data,
            pagination: {
              totalRecords: data.length,
            },
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
            totalRecords: 0,
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
    } else if (user.role == "company") {
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
            deptID: 1,
            parentCompany: 1,
            createdBy: 1,
            numOfSlides: { $size: "$slides" },
            slides: "$slides",
          },
        },
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "Inductions",
            data: data,
            body: req.decoded,
            pagination: {
              totalRecords: data.length,
            },
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
            totalRecords: 0,
          });
        });
    } else if (user.role === "user") {
      // get Parent Company and department of user
      // then pass to query
      // inside token - add parent company and department

      Induction.aggregate([
        {
          $match: {
            $expr: { $eq: ["$parentCompany", ObjectId(user.parentCompany)] },
          },
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
            passPercentage: 1,
            description: 1,
            deptID: 1,
            parentCompany: 1,
            createdBy: 1,
            numOfSlides: { $size: "$slides" },
            slides: "$slides",
          },
        },
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "Inductions",
            data: data,
            reqbody: req.decoded,
            pagination: {
              totalRecords: data.length,
            },
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
            totalRecords: 0,
          });
        });
    } else {
      // super admin
      // .populate('eventsAttended')
      Induction.aggregate([
        {
          $match: {},
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
            deptID: 1,
            parentCompany: 1,
            createdBy: 1,
            numOfSlides: { $size: "$slides" },
            slides: "$slides",
          },
        },
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "Inductions",
            data: data,
            pagination: {
              totalRecords: data.length,
            },
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
            totalRecords: 0,
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

exports.filterByCompany = async (req, res) => {
  try {
    var cond = mongoose.Types.ObjectId.isValid(req.query.filterByCompany);

    if (!cond) {
      throw new Error("Parent Company Id not exist.");
    }
    const user = req.decoded;

    const page = req.query.page > 0 ? req.query.page : 1;
    // const limit = 6;
    // const skips = 6 * (page-1);
    const limit = 3;
    const skips = 3 * (page - 1);
    Induction.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$parentCompany", ObjectId(req.query.filterByCompany)],
          },
        },
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
          deptID: 1,
          parentCompany: 1,
          createdBy: 1,
          numOfSlides: { $size: "$slides" },
        },
      },
    ])
      .then((data) => {
        return res.status(200).send({
          status: true,
          message: "Inductions",
          data: data,
          pagination: {
            totalRecords: data.length,
          },
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message,
          data: {},
          totalRecords: 0,
        });
      });

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
    //console.log('req body', req.body);
    const user = req.decoded;
    //console.log('user', user);

    let iData = JSON.parse(req.body.induction);
    iData.deptID = ObjectId(iData.deptID);
    iData.createdBy = ObjectId(user.userID);

    if (USER_ROLES.SUPER_ADMIN === user.role) {
      // take parent Company from request
      // take deptID from request
      iData.parentCompany = ObjectId(iData.parentCompany);
    }

    if (USER_ROLES.COMPANY === user.role) {
      // take parent Company from token decoded
      iData.parentCompany = ObjectId(user.userID);
    }

    if (USER_ROLES.INSTRUCTOR === user.role) {
      // take parent Company from token decoded= parentCompany of instructor
      iData.parentCompany = ObjectId(user.parentCompany);
    }

    //iData.parentCompany = (user.role ==='company')? ObjectId(user.userID) :ObjectId(user.parentCompany);
    //console.log('company', iData.parentCompany); return;
    const thumbnail = uploadThumbnail(req, res);
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

exports.updatePassingMarks = (req, res) => {
  // req.body.inductionID
  // req.body.passPercentage
  Induction.findOneAndUpdate(
    { _id: ObjectId(req.body.inductionID) },
    { passPercentage: req.body.passPercentage }
  )
    .then((induction) => {
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
    .catch((error) => {
      return res.status(500).send({
        status: false,
        message: error.message,
      });
    });
};

/**
 * base find
 *
 * @param {*} req
 * @param {*} res
 * without filters
 */
exports.users_org = (req, res) => {
  // here we get comapnyID
  // inductionID from filters
  InductionUsers.aggregate([
    {
      $group: {
        _id: {
          userID: "$userID",
          inductionID: "$inductionID",
        },
        total: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id.userID",
        foreignField: "userID",
        as: "profile",
      },
    },
    {
      $lookup: {
        from: "inductions",
        localField: "_id.inductionID",
        foreignField: "_id",
        as: "inductions",
      },
    },
    {
      $lookup: {
        from: "user_induction_results",
        let: {
          inductionID: "$_id.inductionID",
          userID: "$_id.userID",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$inductionID", "$$inductionID"],
                  },
                  {
                    $eq: ["$userID", "$$userID"],
                  },
                ],
              },
            },
          },
        ],
        as: "result",
      },
    },
    {
      $unwind: "$profile",
    },
    {
      $unwind: "$inductions",
    },
    {
      $project: {
        _id: 1,
        userID: 1,
        inductionID: 1,
        total: 1,
        profile: 1,
        inductions: 1,
        result: 1,
      },
    },
  ])
    .then((users) => {
      return res.status(200).send({
        status: true,
        message: "!",
        data: users,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message + " error ",
      });
    });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * with Filters
 */
exports.users = (req, res) => {
  // here we get comapnyID
  // inductionID from filters

  // parentCompany
  // inductionID
  let comapnyID = {};
  let inductionID = {};

  if (req.query.company === undefined || req.query.company === "All") {
    InductionUsers.aggregate([
      {
        $group: {
          _id: {
            userID: "$userID",
            inductionID: "$inductionID",
          },
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.userID",
          foreignField: "userID",
          as: "profile",
        },
      },
      {
        $lookup: {
          from: "inductions",
          localField: "_id.inductionID",
          foreignField: "_id",
          as: "inductions",
        },
      },
      {
        $lookup: {
          from: "user_induction_results",
          let: {
            inductionID: "$_id.inductionID",
            userID: "$_id.userID",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$inductionID", "$$inductionID"],
                    },
                    {
                      $eq: ["$userID", "$$userID"],
                    },
                  ],
                },
              },
            },
          ],
          as: "result",
        },
      },
      {
        $unwind: "$profile",
      },
      {
        $unwind: "$inductions",
      },
      {
        $project: {
          _id: 1,
          userID: 1,
          inductionID: 1,
          total: 1,
          profile: 1,
          inductions: 1,
          result: 1,
        },
      },
    ])
      .then((users) => {
        return res.status(200).send({
          status: true,
          message: "response without filter!",
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message + " error ",
        });
      });
  } else {
    comapnyID = ObjectId(req.query.company);

    if (req.query.induction === undefined || req.query.induction === "All") {
      InductionUsers.aggregate([
        {
          $group: {
            _id: {
              userID: "$userID",
              inductionID: "$inductionID",
            },
            total: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id.userID",
            foreignField: "userID",
            as: "profile",
          },
        },
        {
          $lookup: {
            from: "inductions",
            localField: "_id.inductionID",
            foreignField: "_id",
            as: "inductions",
          },
        },
        {
          $addFields: {
            inductions: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$inductions",
                    as: "comp",
                    cond: {
                      $eq: ["$$comp.parentCompany", comapnyID],
                    },
                  },
                },
                0,
              ],
            },
          },
        },

        {
          $lookup: {
            from: "user_induction_results",
            let: {
              inductionID: "$_id.inductionID",
              userID: "$_id.userID",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$inductionID", "$$inductionID"],
                      },
                      {
                        $eq: ["$userID", "$$userID"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "result",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $unwind: "$inductions",
        },
        {
          $project: {
            _id: 1,
            userID: 1,
            inductionID: 1,
            total: 1,
            profile: 1,
            inductions: 1,
            result: 1,
          },
        },
      ])
        .then((users) => {
          return res.status(200).send({
            status: true,
            message: "Api Working fine else!",
            data: users,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message + " error ",
          });
        });
    } else {
      inductionID = ObjectId(req.query.induction);

      InductionUsers.aggregate([
        {
          $match: {
            $and: [{ inductionID: { $eq: inductionID } }],
          },
        },
        {
          $group: {
            _id: {
              userID: "$userID",
              inductionID: "$inductionID",
            },
            total: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id.userID",
            foreignField: "userID",
            as: "profile",
          },
        },
        {
          $lookup: {
            from: "inductions",
            localField: "_id.inductionID",
            foreignField: "_id",
            as: "inductions",
          },
        },
        {
          $addFields: {
            inductions: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$inductions",
                    as: "comp",
                    cond: {
                      $eq: ["$$comp.parentCompany", comapnyID],
                    },
                  },
                },
                0,
              ],
            },
          },
        },

        {
          $lookup: {
            from: "user_induction_results",
            let: {
              inductionID: "$_id.inductionID",
              userID: "$_id.userID",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$inductionID", "$$inductionID"],
                      },
                      {
                        $eq: ["$userID", "$$userID"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "result",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $unwind: "$inductions",
        },
        {
          $project: {
            _id: 1,
            userID: 1,
            inductionID: 1,
            total: 1,
            profile: 1,
            inductions: 1,
            result: 1,
          },
        },
      ])
        .then((users) => {
          return res.status(200).send({
            status: true,
            message: "Api Working fine!",
            data: users,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message + " error ",
          });
        });
    }
  }
};

exports.getInductionByCompany = async (req, res) => {
  try {
    const user = req.decoded;
    const userRole = user.role;
    let data = {};

    switch (userRole) {
      case USER_ROLES.SUPER_ADMIN:
        data = await Induction.find(
          {
            parentCompany: ObjectId(req.body.parentCompany),
          },
          { _id: 1, title: 1, parentCompany: 1 }
        );
        return res.status(200).send({
          status: true,
          message: "Successfully Getting Data",
          data: data,
        });

      case USER_ROLES.COMPANY:
        data = await Induction.find(
          {
            parentCompany: ObjectId(user.userID),
          },
          { _id: 1, title: 1, parentCompany: 1 }
        );
        return res.status(200).send({
          status: true,
          message: "Successfully Getting Data",
          data: data,
        });

      default:
        // instructor case
        data = await Induction.find(
          {
            parentCompany: ObjectId(user.parentCompany),
          },
          { _id: 1, title: 1, parentCompany: 1 }
        );
        return res.status(200).send({
          status: true,
          message: "Successfully Getting Data",
          data: data,
        });
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message || "Some error occurred.",
    });
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
    const inductionID = req.params.id;

    Induction.updateOne(
      { _id: inductionID },
      { $set: req.body },
      { multi: true },
      function (err, induction) {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message,
          });
        }
        if (!induction) {
          return res.status(500).send({
            status: false,
            message: "Induction not found!",
          });
        } else {
          return res.status(200).send({
            status: true,
            message: "Induction updated successfully!",
            data: induction,
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






