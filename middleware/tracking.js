import { saveClick } from '../controllers/click.controller.js';

export const trackClick = async (req, res, next) => {
    const { influencer, source, campaign } = req.query;
    if (influencer || source || campaign) {
        try {
        await saveClick({
            influencer,
            source,
            campaign,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        });
        } catch (err) {
        console.error('Error saving click in middleware:', err);
        }
    }
    next();
};
