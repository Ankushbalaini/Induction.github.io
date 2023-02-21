module.exports = mongoose => {
    const MCQs = mongoose.model(
      "mcqs",
      mongoose.Schema(
        {
          inductionID : {type: mongoose.Schema.Types.ObjectId, required: true},
          question: { type: String },
          answer: { type: String, required: true, },
          option1: { type: String, required: true},
          option2: { type: String, required: true},
          option3: { type: String },
          option4: { type: String },
          ques_type: {type: String, default: '0'}, // 0 = mcq, 1= true/false
          status:{type: Boolean, default: true } // 1 =active, 0 =inactive
        },
        { timestamps: true }
      )
    );
    
    return MCQs;
  };
