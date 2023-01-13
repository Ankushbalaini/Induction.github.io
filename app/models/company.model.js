module.exports = mongoose => {
    const Company = mongoose.model(
      "company",
      mongoose.Schema(
        {
          name: { type: String, required : true},
          address: { type: String, required : true},
          logo: { type: String },
          companyID: {type: String, unique: true },
          aboutCompany: {type: String},
          user_id: {type: String}
        },
        { timestamps: true }
      )
    );

    return Company;
};
