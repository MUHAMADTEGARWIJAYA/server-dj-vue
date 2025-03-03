import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  img: [{ type: String, required: true }],
  cover: {type:String, required: true},
  gif: {type:String, required: true},
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
  description: { type: String, required: true },
  video_link: { type: String, required: true },
  download_link: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Game", gameSchema);
