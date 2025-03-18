const mongoose = require("mongoose");

const videoDimension = {
    defaultHeight: 1920,
    defaultWidth: 1080,
};

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        controls: {
            type: Boolean,
            default: true,
        },
        transformation: {
            height: {
                type: Number,
                default: videoDimension.defaultHeight,
                required: true,
            },
            width: {
                type: Number,
                default: videoDimension.defaultWidth, // Fixed here
                required: true,
            },
            quality: {
                type: Number,
                min: 1,
                max: 100,
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema); // Fixed here
