import Link from '../models/link.model.js';
import { generateShortCode } from '../utils/generateCode.js';

// 1. Logic to create a new short link
export const createShortLink = async (originalUrl, userId) => {
    const shortCode = generateShortCode();
    
    const newLink = await Link.create({
        originalUrl,
        shortCode,
        owner: userId
    });

    return newLink;
};

// 2. Logic to find a link and increment click count
export const getOriginalUrlAndTrack = async (shortCode) => {
    // $inc is a MongoDB operator that adds 1 to the current value
    const link = await Link.findOneAndUpdate(
        { shortCode },
        { $inc: { clicks: 1 } },
        { new: true } // Return the updated document
    );
    return link;
};



// 1. Fetch all links belonging to a specific user
export const getUserLinks = async (userId) => {
    return await Link.find({ owner: userId }).sort({ createdAt: -1 });
};

// 2. Delete a link (only if the owner matches)
export const deleteLink = async (linkId, userId) => {
    return await Link.findOneAndDelete({ _id: linkId, owner: userId });
};