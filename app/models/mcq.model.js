module.exports = mongoose => {
    const MCQ = mongoose.model(
      "mcqs",
      mongoose.Schema(
        {
          inductionID : {type: mongoose.Schema.Types.ObjectId, required: true},
          question: { type: String },
          answer: { type: String, required: true, },
          options: { type: String, required: true},
          ques_type: {type: String, default: '0'}, // 0 = mcq, 1= true/false
          status:{type: Boolean, default: 1 } // 1 =active, 0 =inactive
        },
        { timestamps: true }
      )
    );
    
    return MCQ;
  };
