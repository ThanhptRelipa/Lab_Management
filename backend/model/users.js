import mongoose from "mongoose";
// import mongoose from "../config/mongodb/mongo";

const usersSchema = mongoose.Schema({
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  avatarUrl: String,
});

// export default mongoose.model("Users", usersSchema);
module.exports = mongoose.model("Users", usersSchema);
