/**Services (src/services): The Chef. 
 * He does the actual heavy lifting—calculating codes, 
 * hashing passwords, and talking to the database. */
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (username, email, password) => {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // 2. Create User (Our model middleware hashes the password automatically!)
    const user = await User.create({
        username,
        email,
        password
    });

    return user;
};

// Helper to generate JWT Token
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const loginUser = async (email, password) => {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // 2. Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    return user;
};
/**
 * We need to let users sign up. But in 2026, we don't just "save a user."
 *  We follow the Security Pipeline:

Request: User sends email/password.

Validation: Check if the email is valid and the password is strong.

Check Existence: Does this user already exist in our MongoDB?

Hashing: NEVER save plain-text passwords. We hash them using bcrypt.

Storage: Save to the database.
 */