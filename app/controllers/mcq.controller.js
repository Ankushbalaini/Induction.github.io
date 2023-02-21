const db = require("../models/");
const MCQs = db.mcqs;
const UserInductions = db.user_inductions;
const UserInductionResults = db.user_induction_results;
const Induction = db.induction;

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

    var mcqData = new MCQs(req.body);

    mcqData.save()
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

exports.edit =(req,res)=>{
  try {
    const id = (req.params.id);
  
    MCQs.findByIdAndUpdate(
      {_id:id},
      {$set:req.body},
      {multi:true}
    ).then((mcq)=>{
      return res.status(200).send({
        status:true,
        message:"Mcq Has been updated Successfully!",
        data : mcq,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        status: false,
        message: error.message || "Some error occurred while updating MCQs.",
      });
    });

  }catch(err){
    return res.status(500).send({
      status:false,
      message:err.message,
    })
  }
}

/**
 * Working fine for multiple ques add
 */
exports.add_org = (req, res) => {
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
    const userID = req.decoded.userID;
    const testID = ObjectId(req.params.testID);
    let passPercentage;

    await Induction.findById(testID)
    .then((ind)=>{
      passPercentage = ind.passPercentage;
    }).catch((err)=>{
      
    });

    const passStatus = (req.body.correctAnswers / (req.body.correctAnswers + req.body.wrongAnswers) )* 100;

    var pass= "Fail";
    if(passStatus >= passPercentage){
      // 
      pass = "Pass";
    }

    const submitDataObj = {
        userID : userID,
        inductionID : testID,
        score: req.body.score,
        correctAnswers: req.body.correctAnswers,
        wrongAnswers: req.body.wrongAnswers,
        testStatus: pass,
        remark: req.body.remark
    };

    Result = new UserInductionResults(submitDataObj);

    Result.save()
    .then((resp)=>{
      return res.status(200).send({
        status: true,
        message: `Success`,
        data: resp,
      });
    })
    .catch((err)=>{
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
 * @description: Finding student by their ID and then updating the profile details
 *
 * @param req
 * @param res
 */
exports.edit = (req, res) => {
  const id = req.params.id; // question id who needs to update

  // return res.status(200).send({
  //   status: true,
  //   message: "Question has been updated! "+id,
  //   data: req.body,
  //   user: req.decoded
  // });


  // Question Update
  MCQs.updateOne(
    { _id: id },
    { $set: req.body },
    { multi: true },
    function (err, ques) {
      if (err) {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      }
      if (!ques) {
        return res.status(500).send({
          status: false,
          message: "Question not found!",
        });
      } else {

          return res.status(200).send({
            status: true,
            message: "Question has been updated!",
            data: ques,
        });
      }
    }
  );
};
