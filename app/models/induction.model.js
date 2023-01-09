module.exports = mongoose => {
    const Induction = mongoose.model(
      "induction",
      mongoose.Schema(
        {
          induction_title: { type: String, default : null},
          induction_department: { type: String, default : null},
          induction_content: { type: String },
         
        },
        { timestamps: true }
      )
    );

    return Induction;
  };