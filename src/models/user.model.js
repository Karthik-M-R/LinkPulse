/**
 * Models (src/models): The Recipe Book. It defines exactly 
 * what a "User" or a "Link" must look like.
 */

//This handles registration and login data.
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });//schema

// 2. The Middleware Hook (Revision)
// We use a regular function() here, NOT an arrow function, 
// because we need 'this' to refer to the user document.
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    /**bcrypt.genSalt(10) creates a random salt with cost factor 10, which is used to securely 
     * hash passwords so identical passwords never produce identical hashes. */
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

export default mongoose.model('User', userSchema);//model

//Schema defines the structure of documents, 
// while a model is a compiled version of the schema used to interact with the database