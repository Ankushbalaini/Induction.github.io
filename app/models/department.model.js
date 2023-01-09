module.exports = mongoose => {
    const Department = mongoose.model(
      "departments",
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