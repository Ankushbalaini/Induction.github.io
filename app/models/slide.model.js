module.exports = mongoose => {
    const Slides = mongoose.model(
      "induction_slides",
      mongoose.Schema(
        {
            slideInductionId : { type: String },
            slideTitle: { type: String, default : null},
            slideContent: { type: String },
            slideOrder: {type : String }
        },
        { timestamps: true }
      )
    );
    return Slides;
  };