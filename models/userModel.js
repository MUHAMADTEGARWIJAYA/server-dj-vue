import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["pengunjung", "admin"], default: "pengunjung" },
    refreshToken: { type: String, default: "" }
});

const User = mongoose.model("User", userSchema);
export default User;
