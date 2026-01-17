/**Middlewares (src/middlewares): The Security Guard. 
 * He checks the ID card (JWT) before letting anyone
 *  into the VIP section (Shortening links). */

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if the "Authorization" header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // 2. Extract the token (Header is "Bearer <token>", so we split by space)
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user in DB using the ID from the token
      // We use .select('-password') so we don't pass the hash around for safety
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Success! Call next() to move to the Controller
      return next();
    }

    // 6. If no token was found at all
    return res.status(401).json({ status: 'fail', message: 'Not authorized, no token provided' });
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ status: 'fail', message: 'Not authorized, token invalid' });
  }
};