const express = require("express");
const fileupload = require('express-fileupload');
const cors = require("cors");
const db = require("./app/models");
const app = express();

app.use(cors());
app.use(fileupload());
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


db.mongoose.set("strictQuery", false);
// db.url
db.mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING ||
    `mongodb+srv://bjsadmin:admin@bjs-homedelivery.ql49p3z.mongodb.net/induction?retryWrites=true&w=majority&tls=true`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT || 8081;

// require("./app/routes/acl.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/induction.routes")(app);
require("./app/routes/slide.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/department.routes")(app);
require("./app/routes/instructor.routes")(app);

require("./app/routes/students.route")(app);
require("./app/routes/dashboard.routes")(app);
require("./app/routes/mcq.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});