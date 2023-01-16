const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome 1to BJS induction application." });
});

db.mongoose.set("strictQuery", false);
// db.url
db.mongoose
  .connect(
    "mongodb+srv://bjsadmin:admin@bjs-homedelivery.ql49p3z.mongodb.net/?retryWrites=true&w=majority&tls=true",
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
require("./app/routes/instructor.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
