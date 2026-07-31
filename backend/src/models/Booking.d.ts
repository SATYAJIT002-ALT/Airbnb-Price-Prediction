import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IBooking, {}, {}, {}, Document<unknown, {}, IBooking, {}, mongoose.DefaultSchemaOptions> & IBooking & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBooking>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map