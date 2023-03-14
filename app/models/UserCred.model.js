module.exports = (mongoose) => {
  // user credentials
  const bcrypt = require('bcrypt');

  const userCredSchema = new mongoose.Schema(
    {
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role: { type: String, required: true },
      token: { type: String },
      parentCompany: { type: mongoose.Schema.Types.ObjectId, ref : 'company' },
      parentInstructor: { type: mongoose.Schema.Types.ObjectId },
      deptID:{type: mongoose.Schema.Types.ObjectId },
      totalCompanies: { type: Number },
      totalInstructors: { type: Number },
      totalCourses: { type: Number },
      totalUsers: { type: Number },
      createdBy: { type: mongoose.Schema.Types.ObjectId },
      status: { type: Boolean, default: false },
      deleted: { type: Boolean, default: false },
      profileData: [
        {
          name: { type: String },
          image: { type: String },
          aboutMe: { type: String },
          gender: { type: String },
          address: { type: String },
          skills: { type: String },
          phone: { type: String },
        }
      ],
      company : { type:mongoose.Schema.Types.ObjectId ,  
        ref : 'company',
      },
      profile : { type:mongoose.Schema.Types.ObjectId ,  
        ref : 'user_cred',
      },
      
      instructor : { type:mongoose.Schema.Types.ObjectId ,  
        ref : 'instructor',
      },

    },
    { timestamps: true }
  );
  
  userCredSchema.pre("save", async function(next) {
    console.log(`Current password without hash is ${this.password}`);
    const passwordHash = await bcrypt.hash(this.password, 10);
    this.password = passwordHash;
    console.log(`After password with hash is ${this.password}`);
    next();
  });
  
  const UserCred = mongoose.model("user_cred", userCredSchema);
  return UserCred;
};
