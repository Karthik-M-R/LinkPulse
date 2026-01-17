/**(The Gatekeeper)
 * This is the file that actually "pushes the button"
 *  to start the process. It imports the configuration from app.js.
 */
import dotenv from 'dotenv'; // 1. Import it
dotenv.config();           // 2. Initialize it FIRST
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Attempt connection
    await connectDB();
    
    // 2. Only start if DB is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the engine:", error.message);
  }
};

startServer();