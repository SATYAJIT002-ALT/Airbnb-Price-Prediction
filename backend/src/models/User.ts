import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: 'Admin' | 'Host' | 'Guest';
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Host', 'Guest'], default: 'Guest' },
    profileImage: { type: String },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
