import express from 'express';
import { createProperty, getProperties, getPropertyById, deleteProperty } from '../controllers/propertyController';
import { protect, host } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getProperties)
    .post(protect, host, createProperty);

router.route('/:id')
    .get(getPropertyById)
    .delete(protect, deleteProperty);

export default router;
