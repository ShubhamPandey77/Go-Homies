const mongoose = require("mongoose");

const vlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Vlog = mongoose.model('vlogs', vlogSchema);
module.exports = Vlog;
