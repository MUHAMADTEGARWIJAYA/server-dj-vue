import Game from "../models/gameModel.js";
import Category from "../models/categoryModel.js";
import Genre from "../models/genreModel.js";

// GET All Games
export const getGames = async (req, res) => {
  try {
    const games = await Game.find().populate("category genre");
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET Games By Category
export const getGamesByCategory = async (req, res) => {
  try {
    const { category_name } = req.params;
  

    const category = await Category.findOne({ name: new RegExp(category_name, "i") });

    if (!category) {
   
      return res.status(404).json({ error: "Category not found" });
    }

   

    const games = await Game.find({ category: category._id }).populate("category genre");

    

    if (games.length === 0) {
      return res.status(200).json({ message: "No games found in this category", games: [] });
    }

    res.json(games);
  } catch (error) {
    console.error("Error fetching games by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





// GET Game By ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("category genre");
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE Game
export const createGame = async (req, res) => {
  try {
    const { name, category_name, genre_name, description, video_link, download_link } = req.body;
    const img = req.files["img"] ? req.files["img"].map((file) => file.filename) : [];
    const cover = req.files["cover"] ? req.files["cover"][0].filename : null;
    const gif = req.files["gif"] ? req.files["gif"][0].filename : null;


    if (!img || img.length === 0) return res.status(400).json({ message: "Image is required" });
    if (!cover) return res.status(400).json({ message: "Cover image is required" });
    if (!gif) return res.status(400).json({message: "Gif is required"});
    // Cari kategori berdasarkan nama
    const category = await Category.findOne({ name: category_name });
    if (!category) return res.status(400).json({ message: "Category not found" });

    // Cari genre berdasarkan nama
    const genre = await Genre.findOne({ name: genre_name });
    if (!genre) return res.status(400).json({ message: "Genre not found" });

    // Cek apakah game dengan nama yang sama sudah ada
    const existingGame = await Game.findOne({ name });
    if (existingGame) return res.status(400).json({ message: "Game already exists" });

    // Simpan game baru
    const newGame = new Game({
      name,
      img,
      cover,
      gif,
      category: category._id,
      genre: genre._id,
      description,
      video_link,
      download_link,
    });

    await newGame.save();
    res.json({ message: "Game added successfully", image: img, cover, gif });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Game
export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, category_name, genre_name, description, video_link, download_link } = req.body;
    const cover = req.file ? req.file.filename : undefined;
    const gif = req.file ? req.file.filename : undefined;

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    // Cari kategori berdasarkan nama
    const category = await Category.findOne({ name: category_name });
    if (!category) return res.status(400).json({ message: "Category not found" });

    // Cari genre berdasarkan nama
    const genre = await Genre.findOne({ name: genre_name });
    if (!genre) return res.status(400).json({ message: "Genre not found" });

    // Update game
    game.name = name;
    game.img = img || game.img;
    game.cover = cover || game.cover;
    game.gif = gif || game.gif;
    game.category = category._id;
    game.genre = genre._id;
    game.description = description;
    game.video_link = video_link;
    game.download_link = download_link;

    await game.save();
    res.json({ message: "Game updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE Game
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    await game.deleteOne();
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
