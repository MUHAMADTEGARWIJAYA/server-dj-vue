import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email sudah digunakan" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "pengunjung",
        });

        await user.save();
        res.status(201).json({ message: "Registrasi berhasil" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cek apakah user ada di database
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password salah" });

        // Generate token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Simpan refresh token ke database
        user.refreshToken = refreshToken;
        await user.save();

        // Set HTTP-only cookie untuk refresh token
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Hanya secure di production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        });

        res.json({ accessToken });
    
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; // Ambil dari cookie
        if (!refreshToken) return res.status(401).json({ message: "Token tidak diberikan" });

        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(403).json({ message: "Refresh token tidak valid" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Token tidak valid" });

            const newAccessToken = generateAccessToken(user);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
};


export const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

        // Hapus refresh token dari database
        user.refreshToken = "";
        await user.save();

        // Hapus cookie refresh token
        res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.json({ message: "Logout berhasil" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
};
