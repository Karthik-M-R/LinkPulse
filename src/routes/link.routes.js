import express from 'express';
import { shortenUrl, redirectUrl, getMyLinks, removeLink } from '../controllers/link.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// PROTECTED: Must be logged in
router.post('/', protect, shortenUrl);           // Create short link
router.get('/my-links', protect, getMyLinks);    // Get user's links

// PROTECTED: Delete a link
router.delete('/:id', protect, removeLink);

// PUBLIC: Just need the short code to redirect (Must be LAST to avoid conflicts)
router.get('/:shortCode', redirectUrl);

export default router;