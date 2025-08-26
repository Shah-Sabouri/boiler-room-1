import User from '../models/users.js';
import Click from '../models/clicks.js';

export const signupUser = async (req, res) => {
    const { name, email } = req.body;
    const clickId = req.cookies?.aid;
    console.log("req.body:", req.body);       // ← se vad frontend skickar

    try {
        const user = new User({ name, email });

        if (clickId) {
            const click = await Click.findById(clickId);
            if (click) {
                user.influencer = click.influencer;
                user.source = click.source;
                user.campaign = click.campaign;
            }
        }

        await user.save();

        req.session.userId = user.__id;
        res.status(201).json({ message: 'Användare skapad', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};