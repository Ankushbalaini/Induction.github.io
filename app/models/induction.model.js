module.exports = (mongoose) => {
  const Induction = mongoose.model(
    "induction",
    mongoose.Schema(
      {
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        deptID: { type: mongoose.Schema.Types.ObjectId },
        description: { type: String, required: true },
        content: { type: String },
        thumbnail: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
        parentCompany: { type: mongoose.Schema.Types.ObjectId, required: true },
        totalSildes: { type: String },
        currentSlide: { type: String },
        totalReviews: { type: String },
        noOfAttempts: { type: String, default: 10 },
        status: { type: Boolean, default: 0 },
        deleted: { type: Boolean, default: 0 },
        attachedSlides: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'induction_slides' }
        ]
      },
      { timestamps: true }
    )
  );

  return Induction;
};
