/**
 * This is the most important one. 
 * It links the URL to the User.
 */
import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  // This 'owner' field is a Reference (Foreign Key) to the User model
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Link', linkSchema);
/**
 * Why we added ref: 'User'?
This is a Relational concept in a NoSQL database. It tells MongoDB: "Hey, this owner field isn't just a random string; it’s the ID of a real person in the User collection." This allows you to use .populate('owner') later to see exactly 
who created which link in one single command
 */