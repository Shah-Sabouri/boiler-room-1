import express from 'express';
import { createClick } from '../controllers/click.controller.js';
const router = express.Router();

router.post('/',createClick);

export default router;