const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "can't be blank"],
            unique: true,
            trim: true,
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, "Provide a valid Email"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: (value) =>
                    validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 3,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1,
                    }),
                message: "Password {VALUE} is not strong enough.",
            },
        },
        contactNumber: {
            type: String,
            validate: [
                validator.isMobilePhone,
                "Please provide a valid contact number",
            ],
        },
        role: {
            type: String,
            enum: ["User", "Candidate", "Hiring-Manager", "Admin"],
            default: "User",
        },
        jobId: {
            type: ObjectId,
            ref: "Job",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
