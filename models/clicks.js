import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    influencer: { type: String },
    source: { type: String },
    campaign: { type: String },
    createdAt: { type: Date, default: Date.now },
    ip: { type: String },
    userAgent: { type: String }
});

const Click = mongoose.model('clicks', clickSchema);

export default Click;