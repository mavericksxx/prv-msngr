import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // cookie cannot be accessed by client side scripts (prevents XSS attacks)
        sameSite: true, // cookie is only sent in same-site requests
        secure: process.env.NODE_ENV !== "development", // cookie is only sent in HTTPS in production 
    });

    return token;
};