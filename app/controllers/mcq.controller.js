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
        return res.status(200).send({
          status: true,
          message: `Success`,
          data: user,
        });
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
exports.submitTest = async (req, res) => {
  try {
    // const testID = ObjectId(req.params.testID);
    // save this testID inside user_induction details
    const inductionID = ObjectId(req.body.inductionID);
    var verifiedData  = { total: 0, correct : 0, incorrect: 0, skiped: 0 };
    let response      = req.body.response;
    
    response.forEach((row) => {
        const questionID = ObjectId(row.questionID);
        // check response is correct or inccorect here
        // return object with same values and make a scroe formula

        if(row.answer ===''){
          verifiedData.skiped++;

        }else{
          
          verifiedData.correct++;
        }
        
        verifiedData.total++;
    });    

    return res.status(200).send({
      status: true,
      message: `Success`,
      data: verifiedData,
    });

  } catch (err) {
    
    return res.status(500).send({
      status: false,
      message: err.message,
    });

  }
};

