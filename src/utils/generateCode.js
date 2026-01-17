import { nanoid } from 'nanoid';

/**
 * 
 * In this file, we want a simple function that 
 * we can call whenever we need a new code.
 * 
 * 
 * 
 * Generates a unique 6-character short code.
 * We use 6 characters because it gives us billions of combinations
 * without being too long for a "short" URL.
 */
export const generateShortCode = () => {
  return nanoid(6); 
};