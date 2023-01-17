module.exports = mongoose => {
    // user credentials
    const UserCred = mongoose.model(
      "user_cred",
      mongoose.Schema(
        {
            email: { type: String, unique: true , required: true },
            password: { type: String , required: true},
            role: { type: String , required: true},
            token : { type: String },
            status: { type: Boolean }
          
        },
        { timestamps: true }
      )
    );
    return UserCred;
  };