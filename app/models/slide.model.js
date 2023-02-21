module.exports = mongoose => {
    const Slides = mongoose.model(
      "induction_slides",
      mongoose.Schema(
        {
            slideInductionId : { type: mongoose.Schema.Types.ObjectId },
            slideTitle: { type: String, default : null},
            slideContent: { type: String },
            slideOrder: {type : String },
            status:{ type : Boolean , default: 1}
        },
        { timestamps: true }
      )
    );
    return Slides;
  };