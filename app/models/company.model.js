module.exports = mongoose => {
    const Company = mongoose.model(
      "company",
      mongoose.Schema(
        {
          name: { type: String, required : true},
          address: { type: String, required : true},
          logo: { type: String },
          id_number: {type: String },
        },
        { timestamps: true }
      )
    );

    return Company;
};
