import express from "express";
import { getGames, getGameById, createGame, updateGame, deleteGame, getGamesByCategory } from "../controllers/gameController.js";
import {uploadMultiple} from "../configs/multer.js";
import upload from "../configs/multer.js";
const router = express.Router();

router.get("/getall", getGames);
router.get("/getall/:category_name", getGamesByCategory);
router.get("/:id", getGameById);
router.post("/create", upload.fields([{ name: "img", maxCount: 5 }, { name: "cover", maxCount: 1 }, { name: "gif", maxCount: 1 }]), createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
