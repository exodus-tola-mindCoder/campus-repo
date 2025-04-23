import express from 'express';

import { getMe, login, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/me', getMe)
router.post('/logout', register)

export default router;