const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ApplySchema = new mongoose.Schema(
    {
        user: {
            id: {
                type: ObjectId,
                ref: "User",
                required: [true, "can't be blank"],
            },
            email: {
                type: String,
                required: [true, "Email address is required"],
            },
        },

        jobInfo: {
            jobId: {
                type: ObjectId,
                ref: "Job",
                required: [true, "can't be blank"],
            },
            jobTitle: {
                type: String,
                required: [true, "can't be blank"],
            },
        },

        employmentType: {
            type: String,
            required: [true, "can't be blank"],
            lowercase: true,
            enum: ["part-time", "full-time", "project-based"],
        },

        qualification: {
            type: String,
            required: [true, "can't be blank"],
        },

        experience: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Apply", ApplySchema);
