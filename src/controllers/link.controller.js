import * as linkService from '../services/link.service.js';

// 1. Create a short link (Protected Route)
export const shortenUrl = async (req, res, next) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Please provide originalUrl' 
            });
        }

        const shortLink = await linkService.createShortLink(originalUrl, req.user._id);
        res.status(201).json({ 
            status: 'success', 
            data: shortLink 
        });
    } catch (error) {
        next(error);
    }
};

// 2. Redirect to original URL and track clicks (Public Route)
export const redirectUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        const link = await linkService.getOriginalUrlAndTrack(shortCode);
        
        if (!link) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Short link not found' 
            });
        }

        res.redirect(301, link.originalUrl);
    } catch (error) {
        next(error);
    }
};

// 3. Get all links for logged-in user (Protected Route)
export const getMyLinks = async (req, res, next) => {
    try {
        const links = await linkService.getUserLinks(req.user._id);
        res.status(200).json({ 
            status: 'success', 
            results: links.length, 
            data: links 
        });
    } catch (error) {
        next(error);
    }
};

// 4. Delete a specific link (Protected Route)
export const removeLink = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deleted = await linkService.deleteLink(id, req.user._id);
        
        if (!deleted) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Link not found or unauthorized' 
            });
        }

        res.status(200).json({ 
            status: 'success', 
            message: 'Link deleted successfully' 
        });
    } catch (error) {
        next(error);
    }
};