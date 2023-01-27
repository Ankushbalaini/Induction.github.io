const db = require("../models/");
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
      /**
       * table name : mcqs
       * { 
       * id: 1, 
       * induction_id: 1, 
       * question: "What is Laravel?", 
       * question_type: 0, 
       * option1: "PHP Framework", 
       * option2: ""
       * option3: ""
       * option4: ""
       * answer: ""  
       * }
       * 
       * */
      
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
