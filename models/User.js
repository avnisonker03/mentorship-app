import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['mentor', 'mentee'], required: true },
    skills: [String],
    bio: String,
    avatar: String
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);