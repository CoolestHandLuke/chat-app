import User from '../models/user.model.js';
import brcrypt from 'bcryptjs';

/* These are the implementations of the route handler callback functions
Each on is fairly straightforward in what it does */

export const signup = async (req, res) => {
    // Any request to MongoDB might fail, so try-catch is needed
    try {
        const { fullName, username, password, confirmPassword, gender } =
            req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        // findOne is a MongoDB method, it will look in to the collection and returns
        // the first entry it finds
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Hash password
        const salt = await brcrypt.genSalt(10);
        const hashPassword = await brcrypt.hash(password, salt);

        // Profile Pic comes form the profilepic API based on the username
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        // Create the new User to be stored in the DB
        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        // save() is  MongoDB method, saves the User to the collection.
        if (newUser) {
            // Generate a JWT Token
            newUser.save();

            // Create the response to be sent to the browser. the _id field is created automatically by MongoDB.
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const login = (req, res) => {
    res.send('Login Successful');
};

export const logout = (req, res) => {
    res.send('Logout Successful');
};
