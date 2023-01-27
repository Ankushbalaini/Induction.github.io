const db = require("../models/");
const MCQs = db.mcqs;
const UserInductions = db.user_inductions;

var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/**
 * @method post
 *
 * @author Singh
 */

exports.add = (req, res) => {
  try {
    req.body.inductionID = ObjectId(req.body.inductionID);
    let questions = req.body.questions;
    questions.forEach((element) => {
      element.inductionID = req.body.inductionID;
    });

    MCQs.insertMany(questions)
      .then((data) => {
        return res.status(200).send({
          status: true,
          message: "MCQ created",
        });
      })
      .catch((error) => {
        return res.status(500).send({
          status: false,
          message: error.message || "Some error occurred while adding MCQs.",
        });
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.index = (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    MCQs.find({ inductionID: id })
      .then((data) => {
        if (data) {
          return res.status(200).send({
            status: true,
            message: `Success`,
            data: data,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message || "Some error occurred while adding MCQs.",
        });
      });
    return;
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: `Could not Induction with id ${req.params.id}`,
    });
  }
};

/**
 * @method POST
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.startTest = (req, res) => {
  try {
    const userID = ObjectId(req.body.userID);
    const inductionID = ObjectId(req.params.inductionID);

    UserInductions.find({
      userID: userID,
      inductionID: inductionID,
    })
      .then((user) => {
        if (user.length > 0) {
          const query = { userID: userID, inductionID: inductionID };
          const update = { $inc: { attemps: 1 } };

          const options = {};
          UserInductions.updateOne(query, update, options)
            .then((user) => {
              return res.status(200).send({
                status: true,
                message: `Find and Updated`,
                data: user,
              });
            })
            .catch((err) => {
              return res.status(500).send({
                status: false,
                message: err.message,
              });
            });
        } else {
          const idata = new UserInductions(req.body);
          idata.save(idata).then((data) => {
            return res.status(200).send({
              status: true,
              message: `New Entry`,
              data: user,
            });
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

/**
 * @method POST
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.submitTest = (req, res) => {
  try {
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};
