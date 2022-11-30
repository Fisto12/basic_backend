import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter your first name"],
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: [true, "please enter your surname"],
      trim: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      required: [true, "please enter your username"],
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// userSchema.virtual('password').set(function(password){
//     let salt =10
//     this.hash_password =  bcrypt.hashSync(password,salt)
// })
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};
export default mongoose.model("Users", userSchema);
