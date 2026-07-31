import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, createBooking);

router.route('/mybookings')
    .get(protect, getMyBookings);

export default router;
