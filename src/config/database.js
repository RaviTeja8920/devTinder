const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://MysticMonkey:N067mUp6KMGIhaTL@nodemonkey.49cmvmo.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
