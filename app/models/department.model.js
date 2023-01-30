module.exports = (mongoose) => {
  const Department = mongoose.model(
    "department",
    mongoose.Schema(
      {
        name: { type: String, required: true, unique: true },
        status: { type: Boolean, default: 1 }, // 1=active, 0= inactive
      },
      { timestamps: true }
    )
  );

  return Department;
};
