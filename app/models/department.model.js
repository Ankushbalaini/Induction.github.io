module.exports = mongoose => {
    const Department = mongoose.model(
      "department",
      mongoose.Schema(
        {
          name: { type: String, default : null},
          department: { type: String }
        },
        { timestamps: true }
      )
    );    
  
    return Department;
  };



/**
 * @description :testing git push and pull by vbvsingh
 *  */  
//////<h1>Demo</h1>