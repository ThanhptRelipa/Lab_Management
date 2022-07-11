const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", usersSchema);
