module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          userID : {type: String, unique: true , required: true},
          parentInstructor: { type: mongoose.Schema.Types.ObjectId},
          userID : {type: mongoose.Schema.Types.ObjectId, unique: true , required: true},
          first_name: { type: String, default : null},
          last_name: { type: String, default : null},
          email: { type: String, unique: true , required: true},
          aboutMe: {type: String},
          profilePhoto : {type: String, default: 'dummy-user.png'},
          department: { type: String },
          status:{type: Boolean, default: 0 },
          deleted:{type: Boolean, default: 0 },
          address:{type:String},
          user_cred: { type: mongoose.Schema.Types.ObjectId, ref: 'user_cred' }
        },
        { timestamps: true }
      )
    );
    
    return User;
  };



