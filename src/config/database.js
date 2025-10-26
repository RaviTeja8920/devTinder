const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://MysticMonkey:sNnZz8nObEaipsTm@nodemonkey.49cmvmo.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
