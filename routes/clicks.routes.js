import express from 'express';
import Click from '../models/clicks.js';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { influencer, source, campaign, ip, userAgent } = req.body;

        const click = new Click({
            influencer, 
            source, 
            campaign, 
            ip: ip || req.up, 
            userAgent: userAgent || req.headers['user-agent']
        });

        await click.save();

        res.status(201).json({ message: 'Click sparad', click });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Sparande av click misslyckades' });
    }
});

export default router;