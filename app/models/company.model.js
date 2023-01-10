module.exports = mongoose => {
    const Company = mongoose.model(
      "company",
      mongoose.Schema(
        {
          email:{ type: String, required : true},
          password: { type: String, required : true}, 
          name: { type: String, required : true},
          address: { type: String, required : true},
          logo: { type: String },
          companyID: {type: String, unique: true },
          aboutCompany: {type: String},
        },
        { timestamps: true }
      )
    );

    return Company;
};
