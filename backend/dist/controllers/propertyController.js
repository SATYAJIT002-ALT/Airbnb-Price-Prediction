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
exports.deleteProperty = exports.getPropertyById = exports.getProperties = exports.createProperty = void 0;
const Property_1 = __importDefault(require("../models/Property"));
const axios_1 = __importDefault(require("axios"));
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, pricePerNight, location, details, amenities, images } = req.body;
        let predictedPrice = pricePerNight;
        // Try to get prediction from ML Service
        try {
            const mlResponse = yield axios_1.default.post(`${ML_SERVICE_URL}/predict`, {
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
        }
        catch (mlError) {
            console.error('ML Service Error:', mlError);
            // Fallback to user provided price if ML service fails
        }
        const property = yield Property_1.default.create({
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
    }
    catch (error) {
        console.error('Create Property Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createProperty = createProperty;
const getProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield Property_1.default.find({}).populate('hostId', 'name email profileImage');
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getProperties = getProperties;
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield Property_1.default.findById(req.params.id).populate('hostId', 'name email profileImage');
        if (property) {
            res.json(property);
        }
        else {
            res.status(404).json({ message: 'Property not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getPropertyById = getPropertyById;
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield Property_1.default.findById(req.params.id);
        if (property) {
            // Check if user is the host
            if (property.hostId.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
                res.status(401).json({ message: 'Not authorized to delete this property' });
                return;
            }
            yield property.deleteOne();
            res.json({ message: 'Property removed' });
        }
        else {
            res.status(404).json({ message: 'Property not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.deleteProperty = deleteProperty;
