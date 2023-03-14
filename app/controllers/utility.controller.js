const fs = require("fs");
var path = require("path");
require("dotenv").config();

function Utility() {}

/**
 *
 * @param {*} file_name
 * @returns fileName to save in DB
 */
Utility.prototype.uploadFile = function (imageObj, OldImg) {
 
    let Img = imageObj.image;
    var extension = path.extname(Img.name);
    var file_name = `user-${Date.now()}${extension}`;
    let uploadPath = `${process.env.UPLOADS_PATH}/profile/${file_name}`;

    Img.mv(uploadPath, function (err) {
      if (err) {
        return false;
      }

      if (OldImg !== "" && OldImg !== "dummy-user.png") {
        // delete previous profile image
        Utility.unlinkFile(OldImg);
      }
    });
    return file_name;
  
};

/**
 *
 * @param {*} file_name
 * @returns boolean
 */
Utility.prototype.unlinkFile = function (file_name) {
  try {
    const path = `${process.env.UPLOADS_PATH}/profile/${file_name}`;

    fs.unlink(path, (err) => {
      if (err) {
        return false;
      }
    });

    return true;
  } catch (err) {
    return false;
  }
};

module.exports = new Utility();
