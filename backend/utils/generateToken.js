import jwt from 'jsonwebtoken';

// A JWT is a JSON Web Token. They are used to ensure secure transmission of data between parties as JSON objects.
// Tokens are generally signed. The most often use case is for authorization. A user logs in to a service (this includes
// SSO) and is then assigned a JWT to be used/sent with every subsequent request. Since the JWT is signed, it is easy
// to verify which sender is making a request and also verify data has not been tampered with.
const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 1000, // milliseconds in 15 days
        httpOnly: true, // Prevent XSS attacks (cross-site scripting attacks)
        sameSite: 'strict', // Prevents CSRF attacks
    });
};

export default generateTokenAndSetCookie;
