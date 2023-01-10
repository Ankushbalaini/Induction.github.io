const db = require("../models");
const Company = db.company;

// Create and Save a new company
exports.add = (req, res) => {

    const {name, address, logo, id_number} = req.body;

    // Validate request
    if (!name && !address && !id_number) {
        res.status(400).send({ 
            status: false, 
            message: "Fields can not be empty!" 
        });
        return;
    }

    
    // check if company already exist
    Company.findOne({ id_number:  id_number })
    .then(function(result){
        if (result) {
            res.status(200).send({ 
                status: false, 
                message: "Company already registered.",
                data: result
            });
            return;
        } 
    });
    
    // Create a User
    const company = new Company({
        name: name,
        address: address,
        logo: logo,
        id_number: id_number
    });

    // Save Company in the database
    company
    .save(company)
    .then(data => {
        res.send({
        status: true,
        message: "Company added successfuly",
        data: data
        });
    })
    .catch(err => {
        res.status(500).send({
        status: false,
        message:
            err.message || "Some error occurred while creating the User."
        });
    });
};

      