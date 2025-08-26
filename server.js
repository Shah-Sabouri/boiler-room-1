import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import clicksRouter from './routes/clicks.routes.js';
import userRouter from './routes/user.routes.js';
import { trackClick } from './middleware/tracking.js';

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'hemlig-session-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dag
}));

// app.use(trackClick);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

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