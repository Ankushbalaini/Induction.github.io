module.exports = mongoose => {
    const Induction = mongoose.model(
      "induction",
      mongoose.Schema(
        {
          // induction_title: { type: String, required : true},
          // induction_department: { type: String, required : true },
          // induction_content: { type: String },
          title: { type: String, required : true},
          subTitle:{type: String, required : true},
          dept_id:{ type: mongoose.Schema.Types.ObjectId },
          description:{type: String, required : true},
          content: { type: String },
          thumbnail: {type:String},
          createdBy:{type: mongoose.Schema.Types.ObjectId, required: true},
          parentCompany:{type: mongoose.Schema.Types.ObjectId, required: true},
          totalSildes:{type: String},
          currentSlide:{type: String},
          totalReviews:{type: String},
          status:{type: Boolean, default: 0 },
          noOfAttempts:{type: String, default: 10},
        },
        { timestamps: true }
      )
    );

    return Induction;
  };