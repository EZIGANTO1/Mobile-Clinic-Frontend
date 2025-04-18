const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = mongoose.Schema(
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

        appointment_date: {
            type: String,
            required: true,
        },

        department: {
            type: String,
            required: true,
        },

        doctor: {
            firstName:{
                type: String,
                required: true,
            },
            lastName:{
                type: String,
                required: true,
            }
        },

        hasVisited: {
            type: Boolean,
            required: true,
        },

        doctorId: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },

        patientId: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ['Pending', 'Accepted', 'Rejected'],
            default: 'Pending'
        }

    },

    {
        timestamps: true,
    }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;