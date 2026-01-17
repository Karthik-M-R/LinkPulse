/**
 * The Routes (The Signpost)
Now we tell Express which URL leads to that controller.
Routes (src/routes): The Menu. It tells the customer what they
 can ask for (e.g., "Register", "Login", "Shorten").
 */
import express from 'express';
import { register , login} from '../controllers/auth.controller.js';

console.log("Checking Register Import:", register);
console.log("Checking Login Import:", login);

const router = express.Router();

router.post('/register', register); // (or )router.route('/register').post(register);
router.post('/login', login);
export default router;