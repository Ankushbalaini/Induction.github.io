module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          first_name: { type: String, default : null},
          last_name: { type: String, default : null},
          email: { type: String, unique: true , required: true},
          department: { type: String },
          user_id : {type: String, unique: true , required: true},
          status: { type: Boolean }
        },
        { timestamps: true }
      )
    );
    
    return User;
  };



