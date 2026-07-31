import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Property from '../models/Property';

export const createBooking = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const { propertyId, checkIn, checkOut, paymentMethod } = req.body;

        const property = await Property.findById(propertyId);
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }

        // Dummy Total Price calculation (Nightly rate * Random nights for demo)
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        const totalPrice = diffDays * property.pricePerNight;

        const booking = await Booking.create({
            propertyId,
            guestId: req.user._id,
            checkIn,
            checkOut,
            totalPrice,
            paymentMethod,
            paymentStatus: 'Paid', // Mock payment for now
            status: 'Confirmed'
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Create Booking Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getMyBookings = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const bookings = await Booking.find({ guestId: req.user._id }).populate('propertyId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
