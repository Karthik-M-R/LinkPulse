/**(The Receptionist)
 * This file is purely for configuration. It doesn't start the server; 
 * it just tells Express how to behave when a request comes in. */
import express from 'express';
import dotenv from 'dotenv'; 
dotenv.config();
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import linkRoutes from './routes/link.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

const app = express();

// 1. Basic Security & Data Parsing Middlewares
app.use(cors()); // Allow different origins to talk to us
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL data (for forms)

// 2. Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);

// 3. Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Server is healthy and breathing! ✅"
  });
});

// 4. 404 Handler (Must be before error handler)
app.use(notFound);

// 5. Error Handler (Must be LAST)
app.use(errorHandler);

export default app;