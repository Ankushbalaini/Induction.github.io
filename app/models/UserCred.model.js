module.exports = mongoose => {
    // user credentials
    const UserCred = mongoose.model(
      "user_cred",
      mongoose.Schema(
        {
            email: { type: String, unique: true },
            password: { type: String },
            role: { type: String },
            token : { type: String },
            status: { type: Boolean }
          
        },
        { timestamps: true }
      )
    );
    return UserCred;
  };