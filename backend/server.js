import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import classRoutes from "./routes/classRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { sendMail } from "./controllers/emailController.js";
import cors from "cors";
import multer from "multer";
import Upload from "./models/uploadModel.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://p-town-west-mma-azure.vercel.app",
    credentials: true,
  })
);


// Define routes:
app.use("/api/classes", classRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.post("/api/send-email", sendMail);

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle uncaught exceptions and rejections
process.on("uncaughtException", (error) => {
  console.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error(`Unhandled Rejection: ${error.message}`);
  process.exit(1);
});

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("profileImage"), async (req, res) => {
  try {
    const file = new Upload({
      filename: req.file.filename,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const savedFile = await file.save();
    console.log("Saved File:", savedFile);

    res.status(201).json({
      message: "File uploaded and saved successfully",
      file: savedFile,
    });

  } catch (error) {
    console.error("Error saving file:", error.message);
    res.status(500).json({ message: "Error saving file", error });
  }
});

app.get("/api/uploads", async (req, res) => {
  try {
    const files = await Upload.find(); // Fetch all files
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error.message);
    res.status(500).json({ message: "Error fetching files", error });
  }
});

app.use("/uploads", express.static("uploads"));
