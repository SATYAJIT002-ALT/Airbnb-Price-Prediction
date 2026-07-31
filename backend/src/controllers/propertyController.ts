import { Request, Response } from 'express';
import Property from '../models/Property';
import axios from 'axios';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export const createProperty = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const { title, description, pricePerNight, location, details, amenities, images } = req.body;

        let predictedPrice = pricePerNight;

        // Try to get prediction from ML Service
        try {
            const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, {
                latitude: location.latitude,
                longitude: location.longitude,
                city: location.city,
                room_type: details.roomType,
                property_type: details.propertyType,
                bedrooms: details.bedrooms,
                bathrooms: details.bathrooms,
                accommodates: details.accommodates
            });
            
            if (mlResponse.data && mlResponse.data.predicted_price) {
                predictedPrice = mlResponse.data.predicted_price;
            }
        } catch (mlError) {
            console.error('ML Service Error:', mlError);
            // Fallback to user provided price if ML service fails
        }

        const property = await Property.create({
            hostId: req.user._id,
            title,
            description,
            pricePerNight,
            predictedPrice,
            location,
            details,
            amenities,
            images
        });

        res.status(201).json(property);
    } catch (error) {
        console.error('Create Property Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const properties = await Property.find({}).populate('hostId', 'name email profileImage');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
    try {
        const property = await Property.findById(req.params.id).populate('hostId', 'name email profileImage');
        
        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteProperty = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            // Check if user is the host
            if (property.hostId.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
                res.status(401).json({ message: 'Not authorized to delete this property' });
                return;
            }

            await property.deleteOne();
            res.json({ message: 'Property removed' });
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
