import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';

// These are the route handlers used whenever a request is made to one of these endpoints.
// The router object is created and used to listen for requests are made, and the appropriate
// callback function is exported back to server.js
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;
