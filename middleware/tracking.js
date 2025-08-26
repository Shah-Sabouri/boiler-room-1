import { saveClick } from '../controllers/click.controller.js';

export const trackClick = async (req, res, next) => {
    const { influencer, source, campaign } = req.body;
    if (influencer || source || campaign) {
        try {
        const click = await saveClick({
            influencer,
            source,
            campaign,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        });

        res.cookie('aid', click._id.toString(), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        } catch (err) {
        console.error('Misslyckades att spara click i middleware:', err);
        }
    }
    next();
};
