import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());

// ROUTE
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
    .catch((err) => console.error(err));