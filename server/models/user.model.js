import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
    ]



}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User 