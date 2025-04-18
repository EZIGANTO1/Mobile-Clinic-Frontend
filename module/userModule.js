const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, 'please provide a valide Email']
        },

        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
            minLength: [11, 'phone number must contain exact 11 digits!'],
            maxLength: [11, 'phone number must contain exact 11 digits!'],
        },
        
        nic: {
            type: String,
            required: true,
            minLength: [13, 'NIC must contain exact 13 digits!'],
            maxLength: [13, 'NIC must contain exact 13 digits!'],
        },

        dob: {
            type: Date,
            required: [true, "DOB is required!"]
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female"]
        },

        password: {
            type: String,
            minLength: [11, 'password must contain at least 8 characters!'],
            required: true,
            select: false
        },

        role: {
            type: String,
            required: true,
            enum: ["Admin", "Patient", "Doctor"]
        },

        doctorDepartment: {
            type: String,
        },

        docAvatar: {
            public_id: String,
            url: String,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

const User = mongoose.model('User', userSchema);
module.exports = User;