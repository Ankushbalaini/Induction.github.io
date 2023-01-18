module.exports = mongoose => {
    const Department = mongoose.model(
      "department",
      mongoose.Schema(
        {
          name: { type: String, required : true, unique: true},
          status:{type:String},
        },
        { timestamps: true }
      )
    );    
  
    return Department;
  };