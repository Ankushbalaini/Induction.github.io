module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          userID : {type: String, unique: true , required: true},
          first_name: { type: String, default : null},
          last_name: { type: String, default : null},
          email: { type: String, unique: true , required: true},
          aboutMe: {type: String},
          department: { type: String },
          status:{type: Boolean, default: 0 },
          deleted:{type: Boolean, default: 0 },
        },
        { timestamps: true }
      )
    );
    
    return User;
  };



