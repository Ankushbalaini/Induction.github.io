module.exports = (mongoose) => {
  const Instructor = mongoose.model(
    "instructor",
    mongoose.Schema(
      {
        userID: { type: mongoose.Schema.Types.ObjectId },
        parentCompany: { type: mongoose.Schema.Types.ObjectId, required: true },
        deptID:{type: mongoose.Schema.Types.ObjectId},
        name: { type: String, required: true },
        profilePhoto: { type: String , default: 'dummy-user.png' },
        aboutMe: { type: String },
        address: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId },
        status:{type: Boolean, default: 0 },
        deleted:{type: Boolean, default: 0 },
      },
      { timestamps: true }
    )
  );
  

  return Instructor;
  
};
