import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    influencer: { type: String },
    source: { type: String },
    campaign: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('users', userSchema);

export default User;
