import express from 'express';

import { register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', register)
router.post('/me', register)
router.post('/logout', register)

export default router;