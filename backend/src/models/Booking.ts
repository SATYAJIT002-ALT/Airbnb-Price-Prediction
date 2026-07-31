import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    propertyId: mongoose.Types.ObjectId;
    guestId: mongoose.Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema: Schema = new Schema({
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    guestId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    paymentMethod: { type: String, required: true, default: 'Dummy' }
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', bookingSchema);
