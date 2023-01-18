module.exports = (mongoose) => {
  const Instructor = mongoose.model(
    "instructor",
    mongoose.Schema(
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, unique: true, required: true },
        parentCompany: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        profilePhoto: { type: String },
        aboutMe: { type: String },
        address: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId },
      },
      { timestamps: true }
    )
  );

  return Instructor;
  
};
