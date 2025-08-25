import Click from '../models/clicks.js';

/**
 * Sparar en ny click till databasen
 * @param {Object} data - Innehåller influencer, source, campaign, ip, userAgent 
 */

export const saveClick = async (data) => {
    try {
        const click = new Click({
            influencer: data.influencer, 
            source: data.source, 
            campaign: data.campaign,
            ip: data.ip,
            userAgent: data.userAgent,
        });
        await click.save();
        return click;
    } catch (err) {
        console.error('Misslyckades att spara click:', err);
        throw err;
    }
};

/**
 * Route-hantering via Express för POST /clicks
 */
export const createClick = async (req, res) => {
    try {
        const { influencer, source, campaign } = req.body;
        const click = await saveClick ({
            influencer, 
            source, 
            campaign,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        });
        res.status(201).json({ message: 'Click saved', click });
    } catch (err) {
        res.status(500)({ error: 'Misslyckades att spara click:' })
    }
}