import Click from "../models/clicks.js";

export const trackClick = async (req, res, next) => {
    const { influencer, source, campaign } = req.query;
    if (influencer || source || campaign) {
        try {
            const click = new Click({
                influencer,
                source,
                campaign,
                iq: req. ip,
                userAngent: req.headers['user-agent']
            });
            await click.save();
            console.log("Click sparad:", click._id);
        } catch (err) {
            console.error("Sparande av click misslyckades:", err);
        }
    }
    next();
};