module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          first_name: { type: String, default : null},
          last_name: { type: String, default : null},
          email: { type: String, unique: true },
          password: { type: String },
          user_type: { type: String },
          department: { type: String },
          published: { type: Boolean },
          token : { type: String }
        },
        { timestamps: true }
      )
    );
    
    return User;
  };