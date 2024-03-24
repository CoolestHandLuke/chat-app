/* This is the root of all the server (backend) activities.  */

import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

// app is the express object from where the server is launched
dotenv.config(); // Required to be done, for whatever reason
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads

app.use('/api/auth/', authRoutes);
// app.get('/', (req, res) => {
//     // root route http://localhost:5000/
//     res.send('Hello World!');
// });

app.listen(PORT, () => {
    connectToMongoDB(); // This function will make the async call to MongoDB and connect to the DB.
    console.log(`Server is running on Port ${PORT}`);
});
