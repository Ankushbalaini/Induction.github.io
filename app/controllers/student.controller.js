const db = require("../models");
const UserCred = db.user_cred;
const User = db.users;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


/*
 * All student api for super admin
 *
 * @ Singh
 */

exports.index = async (req, res) => {
  try{
    const user = req.decoded;
    let companyID, response;
    /*
    if(user.role === 'super_admin'){
      // super admin 

    } else if(user.role === 'company'){
      // get user by parent company
      // parent CompanyID == userID

    } else if (user.role === 'instructor'){
      // get id of instructor and from that get parent company
      // here in decode get parentCompany
    }else{
      // end user 
      // no request comes here

    }
    */

    if(user.role === 'super_admin'){
      // super admin 

    }

    if(user.role === 'company'){
      // get user by parent company
      // parent CompanyID == userID
      req.query.company = user.userID;
    } 

    if (user.role === 'instructor'){
      // get id of instructor and from that get parent company
      // here in decode get parentCompany

      req.query.company = user.parentCompany;
    }



    if(req.query.company !== undefined && req.query.deptID !== undefined ){

      if(req.query.deptID == "All"){
        // enable all departments

        UserCred.aggregate([
          {
            $match: { 
              $expr: {
                $and:[
                  {
                    $eq: ["$role", "user"] ,
                    $eq: ["$parentCompany",  ObjectId(req.query.company) ] 
                    
                  },
    
                ],
                } 
              },
          },
          {
            $lookup: {
              from: "users",
              localField: "email",
              foreignField: "email",
              as: "profile",
            },
          },
          {
            $unwind: "$profile",
          },
          {
            $project: {
              _id: 1,
              email: 1,
              role: 1,
              deptID:1,
              parentCompany:1,
              status: 1,
              profile: 1,
              createdAt: 1,
            },
          },
        ])
          .then((data) => {
            return res.status(200).send({
              status: true,
              message: "All students Listing - 1" ,
              data: data,
  
            });
          })
          .catch((err) => {
            return res.status(500).send({
              status: false,
              message: err.message,
              data: {},
            });
          });

      }else{

        UserCred.aggregate([
          {
            $match: { 
              $expr: {
                $and:[
                  {
                    $eq: ["$role", "user"] ,
                    $eq: ["$parentCompany",  ObjectId(req.query.company) ] ,
                    $eq: ["$deptID",  ObjectId(req.query.deptID) ] ,
                    
                  },
    
                ],
                } 
              },
          },
          {
            $lookup: {
              from: "users",
              localField: "email",
              foreignField: "email",
              as: "profile",
            },
          },
          {
            $unwind: "$profile",
          },
          {
            $project: {
              _id: 1,
              email: 1,
              role: 1,
              deptID:1,
              parentCompany:1,
              status: 1,
              profile: 1,
              createdAt: 1,
            },
          },
        ])
          .then((data) => {
            return res.status(200).send({
              status: true,
              message: "All students Listing - 2",
              data: data,
  
            });
          })
          .catch((err) => {
            return res.status(500).send({
              status: false,
              message: err.message,
              data: {},
            });
          });

      }


      


    }else if(req.query.company !== undefined ) {

      UserCred.aggregate([
        {
          $match: { 
            $expr: {
              $and:[
                {
                  $eq: ["$role", "user"] ,
                  $eq: ["$parentCompany",  ObjectId(req.query.company) ] ,
                },
  
              ],
              } 
            },
        },
        {
          $lookup: {
            from: "users",
            localField: "email",
            foreignField: "email",
            as: "profile",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $project: {
            _id: 1,
            email: 1,
            role: 1,
            deptID:1,
            parentCompany:1,
            status: 1,
            profile: 1,
            createdAt: 1,
          },
        },
      ])
        .then((data) => {
          return res.status(200).send({
            status: true,
            message: "All students Listing - 3",
            data: data,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: false,
            message: err.message,
            data: {},
          });
        });


    }else{

      UserCred.aggregate([
      {
        $match: { 
          $expr: {
            $and:[
              {
                $eq: ["$role", "user"] 
              },
            ],
            } 
          },
      },
      {
        $lookup: {
          from: "users",
          localField: "email",
          foreignField: "email",
          as: "profile",
        },
      },
      {
        $unwind: "$profile",
      },
      {
        $project: {
          _id: 1,
          email: 1,
          role: 1,
          deptID:1,
          parentCompany:1,
          status: 1,
          profile: 1,
          createdAt: 1,
        },
      },
    ])
      .then((data) => {
        return res.status(200).send({
          status: true,
          message: "All students Listing - 4",
          data: data,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message,
          data: {},
        });
      });
      return;
      }
    } catch (err) {
       res.status(500).send({
         status: false,
         message: err.message,
         data: {},
       });
     }
 };










 
exports.index_org = (req, res) => {
 try{
   UserCred.aggregate([
    {
      $match: { 
        $expr: {
          $and:[
            {
              $eq: ["$role", "user"] 
            },
          ],
         } 
        },
    },
    {
      $lookup: {
        from: "users",
        localField: "email",
        foreignField: "email",
        as: "profile",
      },
    },
    {
      $unwind: "$profile",
    },
    {
      $project: {
        _id: 1,
        email: 1,
        role: 1,
        deptID:1,
        parentCompany:1,
        status: 1,
        profile: 1,
        createdAt: 1,
      },
    },
  ])
    .then((data) => {
      return res.status(200).send({
        status: true,
        message: "All students Listing",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message,
        data: {},
      });
    });
    return;
   } catch (err) {
      res.status(500).send({
        status: false,
        message: err.message,
        data: {},
      });
    }
};




exports.index_org2 = (req, res) => {
  var query = { role : 'user' }

  if(req.query.company !== undefined ){
    query.parentCompany = ObjectId(req.query.company);
  }

  if(req.query.deptID !== undefined ){
    query.deptID = ObjectId(req.query.deptID);
  }

  try{
    UserCred.find(query, { password: 0, token: 0})
    .then((users)=>{
      return res.status(200).send({
        status: true,
        message: "All students Listing",
        data: users,
      });
    })
    .catch((err)=>{
      return res.status(500).send({
        status: false,
        message: err.message,
        data: {},
      });
    });

   
    
    } catch (err) {
       res.status(500).send({
         status: false,
         message: err.message,
         data: {},
       });
     }
     
 };



//
const getStudentByCompany = async(req, res) => {
              
   UserCred.aggregate([
                {
                  $match: { 
                    $expr: {
                      $and:[
                        {
                          $eq: ["$role", "user"] ,
                          $eq: ["$parentCompany",  ObjectId(req.decoded.userID) ] ,
                        },

                      ],
                      } 
                    },
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "email",
                    foreignField: "email",
                    as: "profile",
                  },
                },
                {
                  $unwind: "$profile",
                },
                {
                  $project: {
                    _id: 1,
                    email: 1,
                    role: 1,
                    deptID:1,
                    parentCompany:1,
                    status: 1,
                    profile: 1,
                    createdAt: 1,
                  },
                },
              ])
                .then((data) => {

                  return res.status(200).send({
                    status: true,
                    message: "All students Listing",
                    data: data,
                  });
                })
                .catch((err) => {
                  // return res.status(500).send({
                  //   status: false,
                  //   message: err.message,
                  //   data: {},
                  // });
                });
 }






 function getStudentByInstructor() {

 }

