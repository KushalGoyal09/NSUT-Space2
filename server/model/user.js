const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required:[true, `Email is required`],
        trim: true,
        unique:[true, `The email already exists`],
        validate: {
            validator: (value) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message:'Invalid email format'
        }
    },
    username: {
        type: String,
        required:[true,`Please provide with a username`],
        unique:[true, `The username already exist`],
        trim: true
    },
    password: {
        type: String,
        required:[true, `Please provide a password`],
        minlength: [8, `Password must be 8 character long`]
    },  
    created_at: {
        type: Date,
        default: Date.now
    },
    tweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
})

const User = model('User', userSchema);

module.exports = User;