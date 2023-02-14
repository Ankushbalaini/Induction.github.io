const db = require("../models/");
const Department = db.department;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//create new department
/**
 * @description : Creating new deparment ...
 *
 * @param  req
 * @param  res
 * @returns
 */

exports.create = (req, res) => {
  try {
    const user = req.decoded;
    if(user.role === 'company'){
      req.body.parentCompany =  user.userID;
    }
    const { name, status, parentCompany } = req.body;

    // validation
    if (!name) {
      res.status(400).send({
        status: false,
        message: "Invalid , Fields can't be empty",
      });
      return;
    }

    // Create new Department parameter
    const department = new Department({
      name: name,
      parentCompany: parentCompany,
      status: status,
    });

    // Save deparment in the database
    department
      .save()
      .then((data) => {
        res.send({
          status: true,
          message: "New Department has been created",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          message:
            err.message ||
            "Some error occurred while creating the New Deparment.",
        });
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message:
        err.message || "Some error occurred while creating the New Deparment.",
    });
  }
};


//Edit the department
/**
 * @description: Finding department by their ID and then updating the credentials
 *
 * @param req
 * @param res
 */
exports.edit = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to be edit can't be empty!",
    });
  }
  const { name, status } = req.body;
  const id = req.params.id;

  Department.updateOne(
    { _id: id },
    { $set: req.body },
    { multi: true }
  )
    .then((department) => {
      return res.status(200).send({
        status: true,
        message: "Department has been updated!",
        data: department,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    });


    /*

  Department.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(function (department) {
      if (!department) {
        return res.status(500).send({
          status: false,
          message: "Deparment not found.",
          
        });
      } else {
        return res.status(200).send({
          message: "Deparment has been updated successfully",
          data: department,
          status: true,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message:
          err.message ||
          "Some error occurred while creating the New Deparment.",
      });
    });
    */
};

// get the Department
/**
 * @description : Fetching department present in the database.
 *
 * @param req
 * @param res
 */

exports.getDepartment = async (req, res) => {
  const { name, status } = req.body;
  const id = req.params.id;
  // const department = new Department({
  //   name: name,
  //   status: status
  // });

  try {
    const data = await Department.findById(id);
    res.status(200).send({
      message: "Getting department",
      data: data,
      status: true,
    });
  } catch {
    res.status(404).send({
      status: false,
      message: "Department not found.",
    });
  }
};

// Delete the department
/**
 * @description: Finding Deparment by their ID and then deleting.
 *
 * @param req
 * @param res
 */

exports.delete = (req, res) => {
  const id = req.params.id;
  Department.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: false,
          message: "Deparment not found.",
        });
      } else {
        res.send({
          message: "Department deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message,
      });
    });
};

// list all departments
/**
 * @description : Listing all the deparment present in the database
 *
 * @param  req
 * @param  res
 */

exports.getAll = async (req, res) => {
  try {
    const user = req.decoded;

    await Department.find({ parentCompany: ObjectId(user.userID) })
          .then((data)=>{
            return res.status(200).send({
              status: true,
              message: "Successfully Getting Data",
              data: data,
              u: user
            });
          })
          .catch((err)=>{
            return res.status(500).send({
              status: false,
              message: err.message
            });
          });

    
    //const data = await Department.find({ parentCompany: ObjectId(user.userID) });
    
   
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message || "Some error occurred.",
    });
  }
};




exports.getAllActive = async (req, res) => {
  try {
    const user = req.decoded;
    if(user.role === 'company'){
      const data = await Department.find({ status: 1, parentCompany: ObjectId(user.userID) });
      return res.status(200).send({
        status: true,
        message: "Successfully Getting Data",
        data: data,
      });
    }else{
      const data = await Department.find({ status: 1 });
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



exports.getDepartmentByComp = async (req, res) => {
  try {
    const user = req.decoded;
    if(user.role === 'company'){
      const data = await Department.find({ status: 1, parentCompany: ObjectId(user.userID) });
      return res.status(200).send({
        status: true,
        message: "Successfully Getting Data",
        data: data,
  
      });
    }else if(user.role === 'instructor'){
      const data = await Department.find({ status: 1, parentCompany: ObjectId(user.parentCompany) });
      return res.status(200).send({
        status: true,
        message: "Successfully Getting Data",
        data: data,
  
      });

    }
    else{
      // super admin
      const data = await Department.find({ status: 1, parentCompany:  ObjectId(req.body.parentCompany) });
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
}