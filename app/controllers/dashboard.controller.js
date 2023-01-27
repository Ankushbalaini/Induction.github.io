const db = require("../models");
const Dashboard = db.dashboard;
const Inductions = db.induction;
const UserCred = db.user_cred;


const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;



/**
 * when this func called : on user,instructor,induction,company create
 * @param {req} req
 * @param {} res
 * @returns
 */
exports.index = async (req, res) => {
  try {
    let totalUsers,totalCompanies, totalInstructors, totalInductions;

    await UserCred.find({role:'user'})
        .then((user)=>{
            totalUsers = user.length;
        })
        .catch((err)=>{err});

    await UserCred.find({role:'company'})
        .then((comp)=>{
            totalCompanies = comp.length;
        })
        .catch((err)=>{err});

    await UserCred.find({role:'instructor'})
        .then((user)=>{
            totalInstructors = user.length;
        })
        .catch((err)=>{err});
    
    await Inductions.find()
        .then((ind)=>{
            totalInductions = ind.length;
        })
        .catch((err)=>{err});

    return res.status(200).send({
        status: true,
        message: "Api working fine",
        data: {
            "totalUsers": totalUsers,
            "totalCompanies" : totalCompanies,
            "totalInstructors": totalInstructors,
            "totalInductions" : totalInductions
        }
    });
   
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: err.message,

    });
  }
};



