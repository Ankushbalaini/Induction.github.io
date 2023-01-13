module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          first_name: { type: String, default : null},
          last_name: { type: String, default : null},
          email: { type: String, unique: true },
          department: { type: String },
          status: { type: Boolean }
        },
        { timestamps: true }
      )
    );
    
    return User;
  };