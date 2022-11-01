const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const JobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            unique: true,
            required: [true, "can't be blank"],
        },
        employmentType: {
            type: String,
            required: [true, "can't be blank"],
            lowercase: true,
        },
        organizationName: {
            type: String,
            required: [true, "can't be blank"],
        },
        jobDescription: {
            type: String,
            required: [true, "can't be blank"],
        },
        qualification: {
            type: String,
            required: [true, "can't be blank"],
        },
        experience: {
            type: String,
        },
        salary: {
            type: String,
            required: [true, "can't be blank"],
            unique: true,
        },
        jobLocation: {
            type: String,
            required: true,
        },
        hiringManagerId: {
            type: ObjectId,
            ref: "User",
            required: [true, "can't be blank"],
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Job", JobSchema);
