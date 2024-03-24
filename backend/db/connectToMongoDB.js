import mongoose from 'mongoose';

// A standard connection to MongoDB using mongoose. Tucked away here to make the server.js file a little cleaner.
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error.message);
    }
};

export default connectToMongoDB;
