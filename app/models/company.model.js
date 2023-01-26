module.exports = mongoose => {
    const Company = mongoose.model(
      "company",
      mongoose.Schema(
        {
          userID: {type: String, required : true},
          name: { type: String, required : true},
          email : { type: String, required : true, unique: true},
          address: { type: String, required : true},
          logo: { type: String , default: 'dummy-user.png'},
          companyID: {type: String},
          aboutCompany: {type: String},
          createdBy: { type: mongoose.Schema.Types.ObjectId },
          status:{type: Boolean, default: 0 },
          deleted:{type: Boolean, default: 0 },
          
          
        },
        { timestamps: true }
      )
    );

    return Company;
};
