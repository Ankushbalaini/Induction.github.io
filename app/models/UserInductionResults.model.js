module.exports = mongoose => {
    const UserInductionResults = mongoose.model(
      "user_induction_results",
      mongoose.Schema(
        {
          userID: {type: mongoose.Schema.Types.ObjectId, required: true},
          testID: {type: mongoose.Schema.Types.ObjectId},
          inductionID : {type: mongoose.Schema.Types.ObjectId, required: true, ref:'induction'},
          score:{type: String},
          correctAnswers:{type: Number, min: 0, max: 1000},
          wrongAnswers:{type: Number, min: 0, max: 1000},
          testStatus:{type:String},
          remark:{ type: String }
        },
        { timestamps: true }
      )
    );
    
    return UserInductionResults;
  };
