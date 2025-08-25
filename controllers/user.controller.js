import User from '../models/users.js';

export const signupUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({ message: 'Användare skapad' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};