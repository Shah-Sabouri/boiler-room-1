import Click from '../models/clicks.js';

export const createClick = async (req, res) => {
  try {
    const { influencer, source, campaign } = req.body;

    const click = new Click({
      influencer,
      source,
      campaign,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    await click.save();

    // sätt cookie så vi kan koppla user senare
    res.cookie("aid", click._id.toString(), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 vecka
    });

    res.status(201).json({ message: "Click saved", click });
  } catch (err) {
    console.error("Misslyckades att spara click:", err);
    res.status(500).json({ error: "Misslyckades att spara click" });
  }
};
