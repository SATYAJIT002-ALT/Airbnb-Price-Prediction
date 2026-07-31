import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
    hostId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    pricePerNight: number;
    predictedPrice?: number;
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        latitude: number;
        longitude: number;
    };
    details: {
        bedrooms: number;
        bathrooms: number;
        accommodates: number;
        propertyType: string;
        roomType: string;
    };
    amenities: string[];
    images: string[];
    ratings: {
        average: number;
        count: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const propertySchema: Schema = new Schema({
    hostId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    predictedPrice: { type: Number },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    details: {
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        accommodates: { type: Number, required: true },
        propertyType: { type: String, required: true },
        roomType: { type: String, required: true }
    },
    amenities: [{ type: String }],
    images: [{ type: String }],
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.model<IProperty>('Property', propertySchema);
