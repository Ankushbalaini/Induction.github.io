module.exports = (mongoose) => {
  // user credentials
  const UserCred = mongoose.model(
    "user_cred",
    mongoose.Schema(
      {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        token: { type: String },
        parentCompany: { type: mongoose.Schema.Types.ObjectId, ref : 'company' },
        parentInstructor: { type: mongoose.Schema.Types.ObjectId },
        deptID:{type: mongoose.Schema.Types.ObjectId },
        totalCompanies: { type: String },
        totalInstructors: { type: String },
        totalCourses: { type: String },
        totalUsers: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId },
        status: { type: Boolean, default: 0 },
        deleted: { type: Boolean, default: 0 },
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
        company: [
          {
            name: { type: String },
            logo: { type: String },
            aboutCompany: { type: String },
            address: { type: String },
            phone: { type: String },
          },
        ]

      },
      { timestamps: true }
    )
  );
  return UserCred;
};
