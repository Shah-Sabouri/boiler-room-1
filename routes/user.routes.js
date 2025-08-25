import express from 'express';
import User from '../models/users.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({ message: 'Användare skapad', user });
    } catch {
        res.status(400).json({ error: err.message });
    }
});

export default router;