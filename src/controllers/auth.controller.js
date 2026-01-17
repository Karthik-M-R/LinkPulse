/**The Controller (The Manager)
The controller handles the "HTTP stuff" (req and res).
Controllers (src/controllers): The Manager. He takes the order, 
talks to the kitchen, and gives the final plate to the customer. */


import * as authService from '../services/auth.service.js';

// 1. Register Logic (You likely have this)
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide username, email, and password' });
        }
        
        const user = await authService.registerUser(username, email, password);
        const token = authService.generateToken(user._id);
        res.status(201).json({ status: 'success', data: { user, token } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// 2. LOGIN LOGIC (ADD THIS NOW)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
        }
        
        // Talk to service to verify user
        const user = await authService.loginUser(email, password);
        
        // Generate the 30d token
        const token = authService.generateToken(user._id);

        res.status(200).json({
            status: 'success',
            data: {
                user: { id: user._id, username: user.username, email: user.email },
                token
            }
        });
    } catch (error) {
        // 401 means Unauthorized
        res.status(401).json({ status: 'fail', message: error.message });
    }
};