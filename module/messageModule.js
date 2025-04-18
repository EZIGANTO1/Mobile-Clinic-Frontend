const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = mongoose.Schema(
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
        
        message: {
            type: String,
            required: true,
            minLength: [10, 'message must contain at least 10 characters']
        }
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;