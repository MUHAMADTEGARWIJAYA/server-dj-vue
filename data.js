import mongoose from "mongoose";
import Game from "./models/gameModel.js"
import Category from "./models/categoryModel.js";
import Genre from "./models/genreModel.js";
import dotenv from "dotenv";
dotenv.config();

const seedGames = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Cari kategori dan genre berdasarkan nama
    const categories = await Category.find({ name: { $in: ["PS2", "RPG"] } });
    const genres = await Genre.find({ name: { $in: ["RPG", "Sport", "Action", "Adventure", "Fighting", "Strategy"] } });

    if (categories.length === 0 || genres.length === 0) {
      console.log("One or more Categories or Genres not found");
      return;
    }

    const games = [
      {
        name: "GTA SAN",
        img: ["g1.png", "g2.jpg", "g3.jpg"],
        cover: "g0.jpg",
        gif: "g4.gif",
        category: categories[0]._id,
        genre: genres[2]._id,
        description: "GTA San Andreas adalah game open-world legendaris. Pemain berperan sebagai CJ yang kembali ke kampung halamannya. Game ini menawarkan eksplorasi luas dengan berbagai misi menegangkan. Grafis dan gameplay ikonik membuatnya tetap populer hingga kini. Mode modding menambah keseruan tanpa batas.",
        video_link: "https://youtube.com/game1",
        download_link: "https://1fichier.com/?65r3525mtu",
      },
      {
        name: "BULLY",
        img: ["z1.jpg", "z2.jpg, z3.jpg"],
        cover: "z0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[2]._id,
        description: "Bully adalah game open-world bertema sekolah. Pemain berperan sebagai Jimmy Hopkins, anak nakal di Bullworth Academy. Game ini menawarkan petualangan seru dengan berbagai misi unik. Pemain bisa berinteraksi dengan guru, siswa, dan geng sekolah. Gameplay yang khas membuatnya tetap populer hingga kini.",
        video_link: "https://youtube.com/game2",
        download_link: "https://1fichier.com/?2k78msy5sa",
      },
      {
        name: "GOOD OF WAR 2",
        img: ["f1.jpg", "f2.jpg", "f3.jpg"],
        cover: "f0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[3]._id,
        description: "God of War 2 adalah game aksi epik. Pemain berperan sebagai Kratos, mantan Dewa Perang. Petualangan penuh aksi dan teka-teki menantang. Grafis dan cerita epik membuatnya berkesan. Pertarungan melawan dewa-dewa Yunani sangat intens.",
        video_link: "https://youtube.com/game3",
        download_link: "https://1fichier.com/?qspgrln7rh",
      },
      {
        name: "BLACK",
        img: ["b1.jpg", "b2.jpg", "b3.jpg"],
        cover: "b0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[2]._id,
        description: "Black adalah game FPS dengan aksi intens. Pemain berperan sebagai tentara elit dalam misi berbahaya. Grafis dan efek ledakan sangat memukau untuk PS2. Gameplay menekankan pertempuran taktis dan senjata realistis. Suasana perang yang imersif membuatnya tetap dikenang.",
        video_link: "https://youtube.com/game4",
        download_link: "https://1fichier.com/?3vf2gmwvfs",
      },
      {
        name: "DOWNHILL",
        img: ["w1.png", "w2.jpg", "w3.jpg"],
        cover: "w0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[1]._id,
        description: "Downhill Domination adalah game balap sepeda ekstrem. Pemain berlomba menuruni gunung dengan kecepatan tinggi. Gameplay seru dengan aksi freestyle dan pertempuran antar pembalap. Trek beragam dengan lingkungan menantang menambah keseruan. Mode multiplayer membuatnya semakin kompetitif dan menyenangkan.",
        video_link: "https://youtube.com/game5",
        download_link: "https://1fichier.com/?nsoq3ckki7",
      },
      {
        name: "NEED FOR SPEED MW",
        img: ["u1.jpg", "u2.jpg", "u3.jpg"],
        cover: "u0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[2]._id,
        description: "Need for Speed: Most Wanted adalah game balap liar. Pemain harus mengalahkan daftar Blacklist untuk jadi yang terbaik. Kejar-kejaran dengan polisi menambah ketegangan. Mobil bisa dimodifikasi untuk performa dan tampilan lebih keren. Dunia open-world memberikan kebebasan eksplorasi dan balapan seru.",
        video_link: "https://youtube.com/game6",
        download_link: "https://1fichier.com/?gq66xpaqma",
      },
      {
        name: "DEF JAM",
        img: ["d1.jpg", "d2.jpg", "d3.jpg"],
        cover: "d0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[2]._id,
        description: "Def Jam: Fight for NY adalah game fighting bertema hip-hop. Pemain bertarung menggunakan berbagai gaya bela diri. Karakter diambil dari rapper terkenal seperti Snoop Dogg dan Method Man. Arena pertarungan unik dengan interaksi lingkungan yang brutal. Gameplay seru dan cerita menarik membuatnya legendaris.",
        video_link: "https://youtube.com/game7",
        download_link: "https://1fichier.com/?jrv2g5flv7",
      },
      {
        name: "HARVEST MOON WONDER LIFE",
        img: ["m1.jpg", "m2.jpg", "m3.jpg"],
        cover: "m0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[3]._id,
        description: "Harvest Moon: A Wonderful Life adalah game simulasi pertanian. Pemain mengelola pertanian, beternak, dan berinteraksi dengan penduduk desa. Siklus hidup karakter berlangsung dari muda hingga tua. Grafis dan suasana pedesaan memberikan pengalaman santai. Game ini menawarkan cerita mendalam dengan berbagai pilihan hidup.",
        video_link: "https://youtube.com/game8",
        download_link: "https://1fichier.com/?a04xceynib",
      },
      {
        name: "GTA VICE CITY",
        img: ["v1.jpg", "v2.jpg", "v3.jpg"],
        cover: "v0.jpg",
        gif: "z4.gif",
        category: categories[0]._id,
        genre: genres[1]._id,
        description: "GTA Vice City adalah game open-world bertema 80-an. Pemain berperan sebagai Tommy Vercetti, seorang gangster ambisius. Kota penuh warna dengan musik retro menambah atmosfer khas. Misi seru dan aksi kriminal membuat gameplay menarik. Kebebasan eksplorasi menjadikannya salah satu game legendaris.",
        video_link: "https://youtube.com/game9",
        download_link: "https://1fichier.com/?1zyf5dy34v",
      },
    ];

    await Game.insertMany(games);
    console.log("Games seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding games:", error);
    mongoose.connection.close();
  }
};

seedGames();
