/**
 * Think of this as the "Power Grid" of your app. If the power grid isn't on, the blueprints are just useless paper. We’ll set this up in src/config/db.js and then connect it to server.js so your app waits for the 
 * database before it starts listening for users.
 */
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Failed: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
/**We use mongoose.connect(). Notice the process.exit(1)—this is a professional practice. If the database fails to connect, we want the whole server to shut down immediately 
 * rather than running in a "broken" state. */