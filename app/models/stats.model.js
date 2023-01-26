module.exports = (mongoose) => {
    // Stats for superadmin
    const Stats = mongoose.model(
      "stats",
      mongoose.Schema(
        {
          totalCompanies:{ type: String},
          totalInstructors:{type: String},
          totalInductions:{type: String},
          totalInDraft:{type: String},
          totalUsers:{type: String},
        },
        { timestamps: true }
      )
    );
    return Stats;
  };
  