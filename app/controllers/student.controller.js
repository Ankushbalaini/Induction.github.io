const db = require("../models");
const UserCred = db.user_cred;
const User = db.users;

/*
 * All student api for super admin
 *
 * @ Singh
 */

exports.index = (req, res) => {
    UserCred
    .find({ role: 'user' }, { email:1 , role:1, status:1 })
    .then(function (result) {
      if (result) {

        res.status(200).send({
          status: true,
          message: "All Students",
          data: result,
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while fetching the Students.",
      });
    });

}






