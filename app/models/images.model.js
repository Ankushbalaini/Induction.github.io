module.exports = mongoose => {
    const Image = mongoose.model(
      "images",
      mongoose.Schema(
        {
            name: String,
            desc: String,
            img:
            {
                data: Buffer,
                contentType: String
            }
        },
        { timestamps: true }
      )
    );
    
    return Image;
};