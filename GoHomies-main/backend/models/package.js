const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    durationUnit: {
        type: String,
        enum: ['days', 'weeks', 'months'],
        default: 'days'
    },
    basePrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    groupSize: {
        minPersons: {
            type: Number,
            required: true
        },
        maxPersons: {
            type: Number,
            required: true
        }
    },
    inclusions: [String],
    exclusions: [String],
    itinerary: [{
        day: Number,
        title: String,
        description: String,
        activities: [String]
    }],
    amenities: [String],
    highlights: [String],
    image: {
        type: String,
        default: null
    },
    coverImage: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        username: String,
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    availableDates: [{
        startDate: Date,
        endDate: Date,
        seatsAvailable: Number
    }],
    difficulty: {
        type: String,
        enum: ['Easy', 'Moderate', 'Challenging'],
        default: 'Moderate'
    },
    bestTimeToVisit: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Package = mongoose.model('packages', packageSchema);

module.exports = Package;
