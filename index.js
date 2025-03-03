import express from "express";
import dotenv from "dotenv";
import gameRoutes from "./routes/gameRoutes.js";
import cors from "cors";
import path from 'path'; // Import path
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import connectDB from "./configs/db.js";
import mongoose from "mongoose";
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://client-dj-vue.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(cookieParser());
app.use(express.json());
connectDB()
    .then(() => {
        console.log("Database terhubung");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => { 
        console.error("Koneksi database gagal", error);
        process.exit(1);
    });

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
