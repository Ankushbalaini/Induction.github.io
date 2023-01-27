module.exports = mongoose => {
    const MCQs = mongoose.model(
      "user_inductions",
      mongoose.Schema(
        {

          userID: {type: mongoose.Schema.Types.ObjectId, required: true},
          inductionID : {type: mongoose.Schema.Types.ObjectId, required: true},
          attempts: {type: Number, min: 1, max:100 },
          score:{type: String},
          status :{type: Boolean, default: 1 }
        },
        { timestamps: true }
      )
    );
    
    return MCQs;
  };
