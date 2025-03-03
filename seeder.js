import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import Category from "./models/categoryModel.js";
import Genre from "./models/genreModel.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Hapus data lama
    await Category.deleteMany();
    await Genre.deleteMany();

    // Data kategori (platform game)
    const categories = [
      { name: "Nintendo Switch" },
      { name: "PS2" },
    ];

    // Data genre game
    const genres = [
      { name: "RPG" },
      { name: "Sport" },
      { name: "Action" },
      { name: "Adventure" },
      { name: "Fighting" },
      { name: "Racing" },
      { name: "Horror" },
      { name: "Strategy" },
    ];

    // Masukkan data ke database
    await Category.insertMany(categories);
    await Genre.insertMany(genres);

    console.log("✅ Data kategori & genre berhasil dimasukkan!");
    process.exit();
  } catch (error) {
    console.error("❌ Gagal memasukkan data:", error);
    process.exit(1);
  }
};

seedDatabase();
