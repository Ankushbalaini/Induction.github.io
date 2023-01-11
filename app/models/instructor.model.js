module.exports = (mongoose) => {
  const Instructor = mongoose.model(
    "instructor",
    mongoose.Schema(
      {
        user_id: { type: String, unique: true },
        company_id: { type: String, unique: true },
        name: { type: String, required: true },
        profile_pic: { type: String },
        about_me: { type: String },
        address: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

  return Instructor;
};
