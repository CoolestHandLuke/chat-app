import mongoose from 'mongoose';

// The schema for a user, created with mongoose. It's worth remembering, basically what this does is
// create a Class so that we can create objects following the class model (so, just regular instances)
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    profilePic: {
        type: String,
        default: '',
    },
});

const User = mongoose.model('User', userSchema);

export default User;
