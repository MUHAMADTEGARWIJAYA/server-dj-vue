import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token tidak valid" });

        req.user = decoded;
        next();
    });
};

export const verifyAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Akses hanya untuk admin" });
    }
    next();
};
