module.exports = app =>{
    const department = require("../controllers/department.controller")

    var router = require("express").Router();

    //Create New deparment
    router.post('/add',department.create);
    
    // Edit Department
    router.put('/edit/:id',department.edit);

    //List all Department
    router.get('/getall',department.getAll);

    // Delete Department
    router.delete('/delete/:id',department.delete);
    
    // Get department 
    router.get('/get/:id',department.getDepartment);

    app.use('/api/department', router);
}