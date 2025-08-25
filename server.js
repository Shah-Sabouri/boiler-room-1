import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import clicksRouter from './routes/clicks.routes.js';
import userRouter from './routes/user.routes.js';
import { trackClick } from './middleware/tracking.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(trackClick);

// ROUTES
app.use('/clicks', clicksRouter);
app.use('/users', userRouter);

app.get("/", (req, res) => {
    res.send("Server är ansluten!");
});

// MONGODB-ANSLUTNING
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB ansluten");
        app.listen(PORT, () => console.log(`Server körs på: http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Fel vid MongoDB-anslutning:', err));