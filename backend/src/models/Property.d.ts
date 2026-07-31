import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IProperty, {}, {}, {}, Document<unknown, {}, IProperty, {}, mongoose.DefaultSchemaOptions> & IProperty & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProperty>;
export default _default;
//# sourceMappingURL=Property.d.ts.map