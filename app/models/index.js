const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.user_cred = require("./UserCred.model.js")(mongoose);
db.induction = require("./induction.model.js")(mongoose);
db.induction_slides = require("./slide.model.js")(mongoose);
db.company = require("./company.model.js")(mongoose);


module.exports = db;