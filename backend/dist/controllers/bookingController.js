"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Property_1 = __importDefault(require("../models/Property"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { propertyId, checkIn, checkOut, paymentMethod } = req.body;
        const property = yield Property_1.default.findById(propertyId);
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
        const booking = yield Booking_1.default.create({
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
    }
    catch (error) {
        console.error('Create Booking Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createBooking = createBooking;
const getMyBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Booking_1.default.find({ guestId: req.user._id }).populate('propertyId');
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getMyBookings = getMyBookings;
