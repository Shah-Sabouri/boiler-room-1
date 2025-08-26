import express from 'express';
import { createClick } from '../controllers/click.controller.js';
import { trackClick } from '../middleware/tracking.js';

const router = express.Router();

router.post('/', trackClick, createClick);

export default router;